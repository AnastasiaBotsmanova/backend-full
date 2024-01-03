import {log} from '../log';
import {injectable, inject, Container} from 'inversify';
import 'reflect-metadata';

// yarn ts-node src/helloInversionOfControl/tryNinja.ts

interface Warrior {
  fight(): string;
  sneak(): string;
}

interface Weapon {
  hit(): string;
}

interface ThrowableWeapon {
  throw(): string;
}

const TYPES = {
  Warrior: Symbol('Warrior'),
  Weapon: Symbol('Weapon'),
  ThrowableWeapon: Symbol('ThrowableWeapon'),
};

@injectable()
class Katana implements Weapon {
  public hit() {
    return 'cut!';
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  public throw() {
    return 'hit!';
  }
}

@injectable()
class Ninja implements Warrior {
  private _katana: Weapon;
  private _shuriken: ThrowableWeapon;

  public constructor(
        @inject(TYPES.Weapon) katana: Weapon,
        @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon,
  ) {
    this._katana = katana;
    this._shuriken = shuriken;
  }

  public fight() {
    return this._katana.hit();
  }
  public sneak() {
    return this._shuriken.throw();
  }
}

const container = new Container();
container.bind<Warrior>(TYPES.Warrior).to(Ninja);
container.bind<Weapon>(TYPES.Weapon).to(Katana);
container.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

const app = async () => {
  log.info('start');

  const ninja = container.get<Warrior>(TYPES.Warrior);

  log.info(ninja.fight()); // true
  log.info(ninja.sneak()); // true

  log.info('finish');
};

app();
