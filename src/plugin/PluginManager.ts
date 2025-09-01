import path from "path";
import fs from "fs";
import yaml from "js-yaml";

import type { Server } from "../Server.js";
import type { PluginBase } from "./PluginBase.js";

class PluginManager {
    private plugins: PluginBase[] = [];

    getPlugins () {
        return this.plugins;
    }

    async loadPlugins (server: Server) {
        const pluginDirs = fs.readdirSync(path.join(process.cwd(), 'plugins'), { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => d.name);
        
        for (const dir of pluginDirs) {
            const pluginYml = path.join('plugins', dir, 'plugin.yml');
            if (!fs.existsSync(pluginYml)) continue;

            const data = yaml.load(fs.readFileSync(pluginYml, 'utf8')) as any;
            const mainPath = path.join('plugins', dir, 'src', data.main + '.js');
            const mod = await import(path.resolve(mainPath));
            const PluginClass = mod.default;

            const plugin: PluginBase = new PluginClass(data.name);
            await plugin.onEnable(server);
            this.plugins.push(plugin);

            console.log(`[PluginManager] Enabled ${data.name}`);
        }
    }
}

export default new PluginManager()