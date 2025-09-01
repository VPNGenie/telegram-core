import path from "path";
import fs from "fs";
import yaml from "js-yaml";

import type { Server } from "../Server.js";
import type { PluginBase } from "./PluginBase.js";

class PluginManager {
    private plugins: PluginBase[] = [];

    getPlugins (): PluginBase[] {
        return this.plugins;
    }

    async loadPlugins (server: Server) {
        const pluginDirs = fs.readdirSync(path.join(process.cwd(), 'plugins'), { withFileTypes: true });
            .filter(d => d.isDirectory())
            .map(d => d.name);
        
        for (const dir of pluginDirs) {
            const pluginYml = path.join('plugins', dir, 'plugin.yml');
            if (!fs.existsSync(pluginYml)) continue;

            try {
                const data = yaml.load(fs.readFileSync(pluginYml, 'utf8')) as any;
                const mainPath = path.join('plugins', dir, 'src', data.main + '.ts');
                const mod = await import(path.resolve(mainPath));
                const PluginClass = mod.default;

                const plugin: PluginBase = new PluginClass(data, server);
                this.plugins.push(plugin);

                try {
                    await plugin.onEnable();
                    plugin.setEnabled(true);
                } catch (error) {
                    await plugin.setEnabled(false);
                    try {
                        await plugin.onDisable();
                    } catch (e) {
                        console.error(`[PluginManager] Ошибка onDisable ${plugin.getDescription().name}:`, e);
                    }
                }
            } catch (e) {
                console.error(`[PluginManager] Ошибка загрузки плагина ${dir}:`, e);
            }
        }
    }

    async disableAll () {
        for (const plugin of this.plugins) {
            try {
                await plugin.onDisable();
            } catch (error) {
                console.error(`[PluginManager] Ошибка при onDisable плагина ${plugin.getDescription().name}`);
            }
        }
    }
}

export default new PluginManager()