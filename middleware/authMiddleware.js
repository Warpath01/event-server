const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'No token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err); // Log real error for debugging
        res.status(401).json({ msg: 'Invalid token' });
    }
}

exports.admin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    next();
}
