import { Router } from 'express';

const viewsRoutes = Router();

viewsRoutes.get('/', (req, res) => {
    res.render('index', {title: 'Probando'});
});


export default viewsRoutes;