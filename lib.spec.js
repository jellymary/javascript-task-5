/* eslint-env mocha */
'use strict';

const assert = require('assert');

const lib = require('./lib');

const friends = [
    {
        name: 'Sam',
        friends: ['Mat', 'Sharon'],
        gender: 'male',
        best: true
    },
    {
        name: 'Sally',
        friends: ['Brad', 'Emily'],
        gender: 'female',
        best: true
    },
    {
        name: 'Mat',
        friends: ['Sam', 'Sharon'],
        gender: 'male'
    },
    {
        name: 'Sharon',
        friends: ['Sam', 'Itan', 'Mat'],
        gender: 'female'
    },
    {
        name: 'Brad',
        friends: ['Sally', 'Emily', 'Julia'],
        gender: 'male'
    },
    {
        name: 'Emily',
        friends: ['Sally', 'Brad'],
        gender: 'female'
    },
    {
        name: 'Itan',
        friends: ['Sharon', 'Julia'],
        gender: 'male'
    },
    {
        name: 'Julia',
        friends: ['Brad', 'Itan'],
        gender: 'female'
    }
];

describe('Итераторы', () => {
    it('должны обойти в правильном порядке друзей и составить пары', () => {
        const maleFilter = new lib.MaleFilter();
        const femaleFilter = new lib.FemaleFilter();
        const maleIterator = new lib.LimitedIterator(friends, maleFilter, 2);
        const femaleIterator = new lib.Iterator(friends, femaleFilter);

        const invitedFriends = [];

        while (!maleIterator.done() && !femaleIterator.done()) {
            invitedFriends.push([
                maleIterator.next(),
                femaleIterator.next()
            ]);
        }

        while (!femaleIterator.done()) {
            invitedFriends.push(femaleIterator.next());
        }

        assert.deepStrictEqual(invitedFriends, [
            [friend('Sam'), friend('Sally')],
            [friend('Brad'), friend('Emily')],
            [friend('Mat'), friend('Sharon')],
            friend('Julia')
        ]);
    });
    it('maleFilter и femaleFilter должны наледоваться от Filter', () => {
        const maleFilter = new lib.MaleFilter();
        const femaleFilter = new lib.FemaleFilter();
        assert.ok((maleFilter instanceof lib.Filter));
        assert.ok((femaleFilter instanceof lib.Filter));
    });
    it('кидает ошибки при неверном фильтре', () => {
        assert.throws(() => new lib.Iterator(friends, 'hello'), TypeError);
        assert.throws(() => new lib.LimitedIterator(friends, 'hello', 2), TypeError);
    });
    it('не все мальчики', () => {
        const maleFilter = new lib.MaleFilter();
        const maleIterator = new lib.LimitedIterator(friends, maleFilter, 2);

        const invitedFriends = [];

        while (!maleIterator.done()) {
            invitedFriends.push(maleIterator.next());
        }

        assert.deepStrictEqual(invitedFriends, [
            friend('Sam'), friend('Brad'), friend('Mat')
        ]);
    });
    it('все девочки', () => {
        const femaleFilter = new lib.FemaleFilter();
        const femaleIterator = new lib.Iterator(friends, femaleFilter);

        const invitedFriends = [];

        while (!femaleIterator.done()) {
            invitedFriends.push(femaleIterator.next());
        }

        assert.deepStrictEqual(invitedFriends, [
            friend('Sally'), friend('Emily'), friend('Sharon'), friend('Julia')
        ]);
    });

    // it('', () => {});

    function friend(name) {
        let len = friends.length;

        while (len--) {
            if (friends[len].name === name) {
                return friends[len];
            }
        }
    }
});
