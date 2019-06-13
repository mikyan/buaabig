/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = [
            {
                name: '杨乐平',
                id: '17373307',
                phone: '17548212625',
                email: 'zydylp@foxmail.com',
                address: '沙航一公寓B319',
            },
            {
                name: '王磊',
                id: '17373322',
                phone: '17548212598',
                email: 'wanglei@foxmail.com',
                address: '沙航一公寓B320',
            },
            {
                name: '田科',
                id: '17373311',
                phone: '175482126798',
                email: 'tianke@foxmail.com',
                address: '沙航一公寓B321',
            },
            {
                name: '刘艺帆',
                id: '17373314',
                phone: '21456987521',
                email: '刘艺帆@foxmail.com',
                address: '沙航一公寓B321',
            },
            {
                name: '江尚朦',
                id: '17373319',
                phone: '78965412356',
                email: 'jiangshangmeng@foxmail.com',
                address: '沙航一公寓B321',
            },
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(ctx, carNumber, name, id, phone, email, address) {
        console.info('============= START : Create Car ===========');

        const car = {
            name,
            docType: 'car',
            id,
            phone,
            email,
            address,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async createCarn(ctx, name, id, phone, email, address) {
        console.info('============= START : Create Car ===========');
        carNumebr = ctx.stub.endKey + 1;
        const car = {
            name,
            docType: 'person',
            id,
            phone,
            email,
            address,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
        const startKey = 'CAR0';
        const endKey = 'CAR9999999‬';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);

                return allResults;
            }
        }
    }
    async queryAllCarsArray(ctx) {
        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push(Record);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }


    async queryByName(ctx, newName) {
        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                if (Record.name == newName)
                    return JSON.stringify(Record);
                //allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                //return JSON.stringify(allResults);
                return '没有这个人';
            }
        }
    }



    async queryByID(ctx, newID) {
        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                if (Record.id == newID)
                    return JSON.stringify(Record);
                //allResults.push({ Key, Record });
            }
            if (res.done) {
                //console.log('end of data');
                await iterator.close();
                console.info(allResults);
                //return JSON.stringify(allResults);
                return '没有这个人';
            }
        }
    }

    async queryByID(ctx, newPhone) {
        const startKey = 'CAR0';
        const endKey = 'CAR999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                if (Record.phone == newPhone)
                    return JSON.stringify(Record);
                //allResults.push({ Key, Record });
            }
            if (res.done) {
                //console.log('end of data');
                await iterator.close();
                console.info(allResults);
                //return JSON.stringify(allResults);
                return '没有这个人';
            }
        }
    }


    async changePersonName(ctx, personNumber, newName) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(personNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${personNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.name = newName;

        await ctx.stub.putState(personNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

    async changePersonPhone(ctx, personNumber, newPhone) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(personNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${personNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.phone = newPhone;

        await ctx.stub.putState(personNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');

    }

    async changePersonAddress(ctx, personNumber, newAddress) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(personNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${personNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.address = newAddress;

        await ctx.stub.putState(personNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');

    }

    async changePersonEmail(ctx, personNumber, newEmail) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(personNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${personNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.email = newEmail;

        await ctx.stub.putState(personNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');

    }

    async changePersonID(ctx, personNumber, newID) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(personNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${personNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.id = newID;

        await ctx.stub.putState(personNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');

    }


    async changePerson(ctx, key, name, id, phone, email, address) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(key); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${key} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.id = id;
        car.name=name;
        car.phone=phone;
        car.email=email;
        car.address=address;

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');

    }

    async deleteByNumber(ctx, personNumber) {
        console.info('============= START : deleteperson ===========');
        await ctx.stub.deleteState(personNumber);
        console.info('============= END : changeCarOwner ===========');

    }


}







module.exports = FabCar;

