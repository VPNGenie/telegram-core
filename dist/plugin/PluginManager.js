import path from "path";
import fs from "fs";
import yaml from "js-yaml";
class PluginManager {
    plugins = [];
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
                }
                catch (error) {
                    await plugin.setEnabled(false);
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
}
export default new PluginManager();
//# sourceMappingURL=PluginManager.js.map