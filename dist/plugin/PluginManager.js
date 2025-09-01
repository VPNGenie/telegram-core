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
            const data = yaml.load(fs.readFileSync(pluginYml, 'utf8'));
            const mainPath = path.join('plugins', dir, 'src', data.main + '.js');
            const mod = await import(path.resolve(mainPath));
            const PluginClass = mod.default;
            const plugin = new PluginClass(data.name);
            await plugin.onEnable(server);
            this.plugins.push(plugin);
            console.log(`[PluginManager] Enabled ${data.name}`);
        }
    }
}
export default new PluginManager();
//# sourceMappingURL=PluginManager.js.map