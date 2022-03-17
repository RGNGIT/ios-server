export function apiCheck(req, res, next) {
    if (req.originalUrl.includes(process.env.API_CALL)) {
        next();
    } else {
        res.sendFile('index.html', {root: '../front/main-page'});
    }
}
