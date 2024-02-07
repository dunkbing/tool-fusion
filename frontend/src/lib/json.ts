export function generateTypescript(
  jsonObject: Record<string, any>,
  indentNumber = 2
): string {
  if (typeof jsonObject !== 'object' || jsonObject === null) {
    throw new Error('Invalid JSON object');
  }

  const generateType = (
    obj: Record<string, any>,
    depth: number = 1
  ): string => {
    const indent = ' '.repeat(depth * indentNumber);
    const typeDeclaration = ['{\n'];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const valueType = typeof value;

        if (valueType === 'object' && value !== null) {
          typeDeclaration.push(
            `${indent}${key}: ${generateType(value, depth + 1)};\n`
          );
        } else {
          typeDeclaration.push(`${indent}${key}: ${valueType};\n`);
        }
      }
    }

    typeDeclaration.push(`${' '.repeat((depth - 1) * indentNumber)}}`);

    return typeDeclaration.join('');
  };

  const interfaceDeclaration = `export interface GeneratedInterface ${generateType(
    jsonObject
  )};`;

  return interfaceDeclaration;
}

// Example usage:
const jsonObject = {
  name: 'John',
  age: 25,
  address: {
    city: 'New York',
    zip: '10001',
  },
  name1: undefined,
};

const generatedInterface = generateTypescript(jsonObject, 4);
console.log(generatedInterface);
