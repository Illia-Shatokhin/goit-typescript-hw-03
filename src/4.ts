interface IKey {
  getSignature(): number;
}

interface IPerson {
  getKey(): IKey;
}

interface IHouse {
  comeIn(person: IPerson): void;
  openDoor(key: IKey): void;
}

class Key implements IKey {
  private signature: number = Math.random();

  getSignature(): number {
    return this.signature;
  }
}

class Person implements IPerson {
  constructor(private key: IKey) {}

  getKey(): IKey {
    return this.key;
  }
}

abstract class House implements IHouse {
  protected tenants: IPerson[] = [];
  protected door: boolean = false;
  constructor(protected key: IKey) {}

  public comeIn(person: IPerson): void {
    if (this.door) {
      this.tenants.push(person);
    }
  }

  public abstract openDoor(key: IKey): void;
}

class MyHouse extends House implements IHouse {
  public openDoor(key: IKey): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    }
  }
}

const key: IKey = new Key();

const house = new MyHouse(key);
const person: IPerson = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
