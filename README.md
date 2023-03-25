## Clinic Search

### Available Resources

1. Clinic Search

```
GET https://scratchpay.dev.akhlm.app/clinics
```

#### Supported Query Parameters:

- `state`: can be either of the full state name, or
  the state's 2-letter alphaCode. e.g. FL, NY, Florida, Nebraska

- `name`: name of the clinic

- `from`: 24-hour time for clinic availability in the format HH:mm. e.g. 12:30, 18:00

- `to`: 24-hour time for clinic availability in the format HH:mm. e.g. 12:30, 18:00

#### Example requests:

a. fetch clinics in New York

```
GET https://scratchpay.dev.akhlm.app/clinics?state=new%20york
```

b. fetch clinics in Florida that are open by 07:00

```
GET https://scratchpay.dev.akhlm.app/clinics?state=florida&from=07:00
```

c. fetch clinics in Florida that are available between 18:00 & 22:00

```
GET https://scratchpay.dev.akhlm.app/clinics?state=florida&from=18:00&to=22:00
```

### Running the server locally

1. clone the repo
2. create a copy of the `.env.example` file, rename to `.env`, then specify a PORT
3. install the server dependencies by running `yarn install`
4. start the server by running `yarn start`

### Running tests

Once the server's dependencies are correctly installed as advised above, you can
run the test suite using:

```
yarn test
```

for coverage report, run:

```
yarn test --coverage
```
