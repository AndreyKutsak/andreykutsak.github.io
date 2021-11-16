let calculator = new Calculator();
calculator.read();

function Calculator() {
  (this.read = function () {
    this.a = parseInt(prompt("enetre first numver"));
    this.b = parseInt(prompt("eneter second number"));
  }),
    (this.sum = function () {
      return this.a + this.b;
    }),
    (this.mul = function () {
      console.log(this.a + " " + this.b);
      return this.a - this.b;
    });
}
alert("Mul=" + calculator.mul());
alert("Sum=" + calculator.sum());
