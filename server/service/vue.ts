class VueRouter {
    // Запросеки на панель
    async vueRouterPanel(app, express, static_path, res) {
        app.use(express.static(static_path + "/panel"));
        res.sendFile(static_path + '/panel/index.html');
    }
    // Запросеки на мейн
    async vueRouterMain(app, express, static_path, res) {
        app.use(express.static(static_path + "/main-page"));
        res.sendFile(static_path + '/main-page/index.html');
    }
}

export default new VueRouter();