import { useState } from 'react';

const ValidadorCpfCnpj = () => {
  const [valor, setValor] = useState('');

  const handleInputChange = (event) => {
    try {
      let valorInput = event.target.value;
      if (valorInput) {
        valorInput = valorInput
          .match(/.{1,3}/g)
          .join(".")
          .replace(/\.(?=[^.]*$)/, "-");
      }

      setValor(valorInput);

      const tamanho = event.target.value.length;
      if (tamanho === 14) {
        const isValid = validaCpfCnpj(event.target.value);
        if (!isValid) {
          alert("CPF inválido.");
        } else {
          // Faça algo com o CPF válido, se necessário
        }
      } else if (tamanho > 14) {
        setValor(event.target.value.substring(0, 14));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const validaCpfCnpj = (val) => {
    var cpf = val.trim();
    cpf = cpf.replace(/\./g, "");
    cpf = cpf.replace("-", "");
    cpf = cpf.split("");

    var v1 = 0;
    var v2 = 0;
    var aux = false;

    for (var i = 1; cpf.length > i; i++) {
      if (cpf[i - 1] !== cpf[i]) {
        aux = true;
      }
    }

    if (!aux) {
      return false;
    }

    for (var i = 0, p = 10; cpf.length - 2 > i; i++, p--) {
      v1 += cpf[i] * p;
    }

    v1 = (v1 * 10) % 11;

    if (v1 === 10) {
      v1 = 0;
    }

    if (v1 !== cpf[9]) {
      return false;
    }

    for (var i = 0, p = 11; cpf.length - 1 > i; i++, p--) {
      v2 += cpf[i] * p;
    }

    v2 = (v2 * 10) % 11;

    if (v2 === 10) {
      v2 = 0;
    }

    return v2 === cpf[10];
  };

  return { valor, handleInputChange };
};

export default ValidadorCpfCnpj;
