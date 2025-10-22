declare module 'd3-cloud' {
  interface Word {
    text: string;
    size: number;
    [key: string]: any;
  }

  interface CloudLayout<T extends Word> {
    start(): CloudLayout<T>;
    stop(): CloudLayout<T>;
    timeInterval(time: number): CloudLayout<T>;
    words(words: T[]): CloudLayout<T>;
    size(size: [number, number]): CloudLayout<T>;
    font(font: string | ((word: T) => string)): CloudLayout<T>;
    fontSize(size: (word: T) => number): CloudLayout<T>;
    rotate(rotation: () => number): CloudLayout<T>;
    padding(padding: number): CloudLayout<T>;
    on(event: 'word' | 'end', callback: (words: T[]) => void): CloudLayout<T>;
  }

  export default function cloud<T extends Word>(): CloudLayout<T>;
}
