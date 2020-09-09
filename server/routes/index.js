var express = require('express');
var router = express.Router();
const api = require('../api');

/* GET home page. */
router.get('/login', (req, res) => {
    api.login({
        params: {
            user: req.query.user,
            pwd: req.query.pwd,
        }
    })
        .then(r => {
            res.json(r.data)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
});

router.get('/tree', (req, res) => {
    api.utilRequest({
        params: {
            func: 'get_tree',
            sid: 'jb7ivd8d',
            is_iso: '0',
            node: 'share_root',
        }
    })
        .then(r => {
            res.json(r.data)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

router.get('/list', (req, res) => {
    api.postUtilRequest({
        func: 'get_list',
        sid: req.query.sid,
        is_iso: '0',
        list_mode: 'all',
        path: req.query.path,
        dir: 'ASC',
        limit: '100',
        sort: 'mt',
        start: '0',
    })
        .then(r => {
            res.json(r.data)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})


router.get('/download', (req, res) => {
    api.postUtilRequest({
        func: 'download',
        sid: req.query.sid,
        isfolder: 0,
        compress: 0,
        source_path: req.query.path,
        source_file: req.query.file,
        source_total: 1,

    })
        .then(r => {
            res.send(r.data)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

module.exports = router;
