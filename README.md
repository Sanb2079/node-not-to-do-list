# RESTFull Api for not to do list

This api is create fro react not to do frontend application, here is the repo for the frontend `...`

## How to run

1. open your terminal at your development folder
2. Run `git clone ....`
3. Run `cd ....`
4. Run `npm install`
5. Run `npm start`

Now, you your server is runn at `http://localhost:8000`

## API details

This server applies the REST full principle to provide API.
All the app will follow `<rooturl>/v1/,resources end point`

### Task API

All thr task related transaction of api will be request through `<rooturl>/v1/task`

| #   | PATH | METHOD(VERB) | IS PRIVATE | DESCRIPTION                                               |
| --- | ---- | ------------ | ---------- | --------------------------------------------------------- |
| 1.  | `/`  | GET          | NO         | THIS ENDPOINT WILL RETURN ALL THE TASK FROM DATABASE      |
| 2.  | `/`  | POST         | NO         | REVEIVES AN OBJECT FROM THE CLIENT AND STORES IN DATABASE |
| 3.  | `/`  | PUT          | NO         | RECEIVES `_id` OF THE SPECIFIC OBJECT AND DATA TO UPDATE  |
| 4.  | `/`  | DELETE       | NO         | RECEIVES `_id` OF THE SPECIFIC OBJECT AND DATA TO DELETE  |
