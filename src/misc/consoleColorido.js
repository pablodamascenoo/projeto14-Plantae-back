import chalk from "chalk";

export function alerta(texto) {
  console.log(chalk.bold.yellow(texto));
}

export function sucesso(texto) {
  console.log(chalk.bold.green(texto));
}

export function perigo(texto) {
  console.log(chalk.bold.red(texto));
}
