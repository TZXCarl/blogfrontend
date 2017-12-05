import * as React from 'react';

export interface HelloProps { compiler: string; framework: string;}
interface point {
    readonly x : number,
    readonly y: number,
}

interface SquareConfig{
    color?: string,
    width?: number,
    [propName: string]: any
}

export class Hello extends React.Component<HelloProps, {}>{

    //元组
    tuple = () => {
        let x: [string, number];
        x = ['hello', 10];
        return x[0].substr(1, 2)
    }

    getEnum = () => {
        enum Color {Red, Green, Blue};
        let c: string = Color[2];
        return c
    }

    checkLet = () => {
        for(let i=0;i<10;++i) {
            setTimeout(() => {
                console.log(i)
            })
        }
    }


    testInterface = () => {
        let p: point = {x: 10, y: 5};
        // p.x = 20;
        console.log(p);
    }

    testFunc = (firstName: string, lastName : string) => {

        return firstName + " " + lastName;
    }


    createSquare = (config: SquareConfig): {color: string, width: number} => {
        console.log(config.width * config.width);
        return null;
    }

    render() {
        this.testFunc('tang', 'zx');
        this.createSquare({color: 'red', width: 100, colour: 'blue'});
        this.testInterface();
        this.checkLet()
        let list: Array<number> = [1, 2, 3];
        return <h1>{this.getEnum()}</h1>
    }
}

interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T> (arg: T): T{
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;