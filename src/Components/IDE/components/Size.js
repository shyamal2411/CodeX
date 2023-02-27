class Size {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

let extraSmall = new Size("extraSmall", "14");
let small = new Size("Small", 18);
let medium = new Size("Medium", 22);
let large = new Size("Large", 26);

export let sizes = [extraSmall, small, medium, large];