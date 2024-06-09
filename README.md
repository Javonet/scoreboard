### Javonet Scoreboard

#### Installation

1. In theory, it should work out-of-box. At the root directory write

> `npm install`

2. After successfully, run below Which will install node_modules folder of /client subproject

> `npm run post-install`

#### Usage

To run the project make `npm` run dev` to init nodemon which allows you to also change manually score.json file that change will automatically reload the node server you can also make `npm `run start` which will run a server with /client base API endpoints

After run you should see something like this:

```
Local IP Address: 192.168.1.31
Server is running on port http://192.168.1.31:5001
```

FYI: If you need to change PORT to a different one modify the env variable that is placed at `.env` file.


#### Routes

Basic route to display scoreboard

http://192.168.1.31:5001/ 

Optional: **?tab=1** query param that limit results to tab * 10 elements

for ex. tab=1 will display 0,10 scores of array
tab=2 will display 10,20 scores of array

http://192.168.1.31:5001/editor - modify the list of scores that are placed at scores.json

