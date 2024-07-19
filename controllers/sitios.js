const { Sitio } = require('../models/');

module.exports = {
    create(req, res) {
        const { descripcion, latitud, longitud } = req.body;
        const fotografia = req.files && req.files.fotografia ? req.files.fotografia[0].path : null;
        const audiofile = req.files && req.files.audiofile ? req.files.audiofile[0].path : null;

        if (!descripcion || !latitud || !longitud ) {
            return res.status(400).send({ message: 'Todos los campos son requeridos' });
        }

        return Sitio.create({
            descripcion,
            latitud,
            longitud,
            fotografia,
            audiofile
        })
        .then(sitio => res.status(201).send(sitio))
        .catch(error => res.status(400).send({ message: error.message }));
    },

    list(_, res) {
        return Sitio.findAll({})
            .then(sitios => res.status(200).send(sitios))
            .catch(error => res.status(400).send({ message: error.message }));
    },

    find(req, res) {
        const { id } = req.params;

        return Sitio.findOne({
            where: { id }
        })
            .then(sitio => {
                if (!sitio) {
                    return res.status(404).send({ message: 'Sitio no encontrado' });
                }
                return res.status(200).send(sitio);
            })
            .catch(error => res.status(400).send({ message: error.message }));
    },

    update(req, res) {
        const { id } = req.params;
        const { descripcion, latitud, longitud } = req.body;
        const fotografia = req.files && req.files.fotografia ? req.files.fotografia[0].path : null;
        const audiofile = req.files && req.files.audiofile ? req.files.audiofile[0].path : null;
    
        return Sitio.findOne({
            where: { id }
        })
        .then(sitio => {
            if (!sitio) {
                return res.status(404).send({ message: 'Sitio no encontrado' });
            }
    
            const updatedFields = {};
            if (descripcion) updatedFields.descripcion = descripcion;
            if (latitud) updatedFields.latitud = latitud;
            if (longitud) updatedFields.longitud = longitud;
            if (fotografia) updatedFields.fotografia = fotografia;
            if (audiofile) updatedFields.audiofile = audiofile;
    
            return sitio.update(updatedFields)
                .then(() => res.status(200).send({ message: 'Sitio actualizado correctamente', sitio }))
                .catch(error => res.status(400).send({ message: error.message }));
        })
        .catch(error => res.status(400).send({ message: error.message }));
    }
    ,

    delete(req, res) {
        const { id } = req.params;
        return Sitio.destroy({ where: { id } })
            .then(deleted => {
                if (!deleted) {
                    return res.status(404).send({ message: 'Sitio no encontrado' });
                }
                return res.status(200).send({ message: 'Sitio ha sido borrado' });
            })
            .catch(error => res.status(400).send({ message: error.message }));
    }
};
