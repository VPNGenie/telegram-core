import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import { PluginEnableEvent } from "../event/plugin/PluginEnableEvent.js";
import { PluginDisableEvent } from "../event/plugin/PluginDIsableEvent.js";
class PluginManager {
    plugins = [];
    listeners = {};
    getPlugins() {
        return this.plugins;
    }
    async loadPlugins(server) {
        const pluginDirs = fs.readdirSync(path.join(process.cwd(), 'plugins'), { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => d.name);
        for (const dir of pluginDirs) {
            const pluginYml = path.join('plugins', dir, 'plugin.yml');
            if (!fs.existsSync(pluginYml))
                continue;
            try {
                const data = yaml.load(fs.readFileSync(pluginYml, 'utf8'));
                const mainPath = path.join('plugins', dir, 'src', data.main);
                const mod = await import(path.resolve(mainPath));
                const PluginClass = mod.default;
                const plugin = new PluginClass(data, server);
                this.plugins.push(plugin);
                try {
                    await plugin.onEnable();
                    plugin.setEnabled(true);
                    await server.getPluginManager().callEvent(new PluginEnableEvent(plugin));
                }
                catch (error) {
                    await plugin.setEnabled(false);
                    await server.getPluginManager().callEvent(new PluginDisableEvent(plugin));
                    try {
                        await plugin.onDisable();
                    }
                    catch (e) {
                        console.error(`[PluginManager] Ошибка onDisable ${plugin.getName()}:`, e);
                    }
                }
            }
            catch (e) {
                console.error(`[PluginManager] Ошибка загрузки плагина ${dir}:`, e);
            }
        }
    }
    async disableAll() {
        for (const plugin of this.plugins) {
            try {
                await plugin.onDisable();
            }
            catch (error) {
                console.error(`[PluginManager] Ошибка при onDisable плагина ${plugin.getName()}`);
            }
        }
    }
    async callEvent(event) {
        const eventName = event.constructor.name;
        const handlers = this.listeners[eventName];
        if (!handlers)
            return;
        for (const { plugin, method } of handlers) {
            if (!plugin.isEnabled())
                continue;
            try {
                await method(event);
            }
            catch (e) {
                plugin.getLogger().error(`Ошибка в обработчике ${eventName}: ${e}`);
            }
        }
    }
    registerEvents(listener, plugin) {
        for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(listener))) {
            if (key.startsWith('on') && key.endsWith('Event')) {
                const eventName = key.replace(/^on/, '');
                if (!this.listeners[eventName])
                    this.listeners[eventName] = [];
                this.listeners[eventName].push({ plugin, method: listener[key].bind(listener) });
            }
        }
    }
}
export default new PluginManager();
//# sourceMappingURL=PluginManager.js.map