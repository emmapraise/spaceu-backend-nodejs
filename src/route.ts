import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserRoutes from './Modules/Users/Routes/UserRoutes';
import SpaceRoutes from './Modules/Spaces/Routes/SpaceRoutes';
import MediaRoutes from './Modules/Media/Routes/MediaRoutes';

const app = express();
app.use(express.json());

app
	.use(express.static(__dirname + '/public'))
	.use(cors())
	.use(cookieParser());

app.get('/', (req, res) => {
	res.send('API is running');
});

app.use('/api/users', UserRoutes);
app.use('/api/spaces', SpaceRoutes);
app.use('/api/media', MediaRoutes);

export default app;
