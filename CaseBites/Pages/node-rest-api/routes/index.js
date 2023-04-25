const authRoute=require('./auth.route');
const profileRoute=require('./profile.route');
const blogRoute=require('./blog.route');
const blogCommentRoute=require('./blogComment.route');
module.exports=(app)=>{
	app.get('/',function(req,res){
		res.send({
			'message':'Our first endpoint'
		});
	});

	app.use('/auth',authRoute);
	app.use('/profile',profileRoute);
	app.use('/blogs',blogRoute);
	app.use('/blogs',blogCommentRoute);

	app.get('/home', function(req, res) {
		res.sendFile('home.html', {root: __dirname + '/../public'});
	});

	app.get('/login', function(req, res) {
		res.sendFile('login.html', {root: __dirname + '/../public'});
	});

	app.get('/register', function(req, res) {
		res.sendFile('register.html', {root: __dirname + '/../public'});
	});




}