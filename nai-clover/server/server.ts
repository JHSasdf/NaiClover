import * as express from 'express';
import { Express, Request, Response } from 'express';
import * as path from 'path';

const app: Express = express();
const PORT: number = 8080;

app.use(express.static(__dirname + '/../build'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 아래 구문은 react에서 라우팅을 담당하게 하는 구문. post 등의 라우터는 위에 설정하면 될듯.
// 에러처리는 리액트에서 해야하나??? 어떻게하지

app.get('*', function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, '/../build/index.html'));
});

app.listen(PORT, () => {
  console.log(`server is running at port${PORT}`);
});
