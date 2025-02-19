// import { PrismaClient } from '@prisma/client';
import app from  './route'
require('dotenv').config();


const PORT = process.env.PORT || 3000;
// const prisma = new PrismaClient();


app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
