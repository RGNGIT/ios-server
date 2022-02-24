export function apiCheck(req, res, next) {
    if (req.originalUrl.includes('/api')) {
        next();
    } else {
        res.sendFile('index.html', {root: '../front/main-page'});
    }
}
