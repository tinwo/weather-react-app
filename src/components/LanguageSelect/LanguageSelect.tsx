import { useWeatherParams } from "../../context";

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
}

interface ILanguages {
  name: string,
  code: string,
}

const languages: ILanguages[] = [
  { name: 'Arabic', code: 'ar' }, { name: 'Bengali', code: 'bn' },
  { name: 'Bulgarian', code: 'bg' }, { name: 'Chinese Simplified', code: 'zh' },
  { name: 'Chinese Traditional', code: 'zh_tw' }, { name: 'Czech', code: 'cs' },
  { name: 'Danish', code: 'da' }, { name: 'Dutch', code: 'nl' },
  { name: 'Finnish', code: 'fi' }, { name: 'French', code: 'fr' },
  { name: 'German', code: 'de' }, { name: 'Greek', code: 'el' },
  { name: 'Hindi', code: 'hi' }, { name: 'Hungarian', code: 'hu' },
  { name: 'Italian', code: 'it' }, { name: 'Japanese', code: 'ja' },
  { name: 'Javanese', code: 'jv' }, { name: 'Korean', code: 'ko' },
  { name: 'Mandarin', code: 'zh_cmn' }, { name: 'Marathi', code: 'mr' },
  { name: 'Polish', code: 'pl' }, { name: 'Portuguese', code: 'pt' },
  { name: 'Punjabi', code: 'pa' }, { name: 'Romanian', code: 'ro' },
  { name: 'Russian', code: 'ru' }, { name: 'Serbian', code: 'sr' },
  { name: 'Sinhalese', code: 'si' }, { name: 'Slovak', code: 'sk' },
  { name: 'Spanish', code: 'es' }, { name: 'Swedish', code: 'sv' },
  { name: 'Tamil', code: 'ta' }, { name: 'Telugu', code: 'te' },
  { name: 'Turkish', code: 'tr' }, { name: 'Ukrainian', code: 'uk' },
  { name: 'Urdu', code: 'ur' }, { name: 'Vietnamese', code: 'vi' },
  { name: 'Wu (Shanghainese)', code: 'zh_wuu' }, { name: 'Xiang', code: 'zh_hsn' },
  { name: 'Yue (Cantonese)', code: 'zh_yue' }, { name: 'Zulu', code: 'zu' }
];


const LanguageSelect = ({ value, onChange }: LanguageSelectProps): React.ReactElement => {
  const { setLang } = useWeatherParams();

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(event.target.value);
    setLang(event.target.value);
  }

  return (
    <div className="relative w-full max-w-[200px]">
      <select
        value={value}
        onChange={onChangeHandler}
        className="w-full px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none appearance-none cursor-pointer hover:bg-white focus:border-blue-400 transition-colors"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      {/* Стрілочка */}
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-400">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelect;