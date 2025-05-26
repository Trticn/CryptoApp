import axios from 'axios';

function cyrToLat(text) {
  const map = {
    А: 'A',
    Б: 'B',
    В: 'V',
    Г: 'G',
    Д: 'D',
    Ђ: 'Đ',
    Е: 'E',
    Ж: 'Ž',
    З: 'Z',
    И: 'I',
    Ј: 'J',
    К: 'K',
    Л: 'L',
    Љ: 'Lj',
    М: 'M',
    Н: 'N',
    Њ: 'Nj',
    О: 'O',
    П: 'P',
    Р: 'R',
    С: 'S',
    Т: 'T',
    Ћ: 'Ć',
    У: 'U',
    Ф: 'F',
    Х: 'H',
    Ц: 'C',
    Ч: 'Č',
    Џ: 'Dž',
    Ш: 'Š',
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    ђ: 'đ',
    е: 'e',
    ж: 'ž',
    з: 'z',
    и: 'i',
    ј: 'j',
    к: 'k',
    л: 'l',
    љ: 'lj',
    м: 'm',
    н: 'n',
    њ: 'nj',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    ћ: 'ć',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'č',
    џ: 'dž',
    ш: 'š',
  };

  return text
    .split('')
    .map((char) => map[char] || char)
    .join('');
}
export async function translateText(text) {
  try {
    const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
      params: {
        client: 'gtx',
        sl: 'en',
        tl: 'sr',
        dt: 't',
        q: text,
      },
    });

    const array1 = response.data[0];

    const array2 = array1.map((arr) => arr[0]);
    const translatedText = array2.map((tr) => tr).join(' ');

    return cyrToLat(translatedText);
  } catch (error) {
    return text;
  }
}
