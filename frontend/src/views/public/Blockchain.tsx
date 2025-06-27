import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Blockchain() {
  return (
    <>
      <header>
        <title>TDB | Какво е Блокчейн?</title>
      </header>
      <div className="max-w-5xl mx-auto p-6 text-gray-400  max-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="bg-transparent backdrop-blur-xl bg-transparent rounded-xl p-6 overflow-y-auto max-h-screen"
        >
          <h1 className="text-4xl text-gray-300 font-bold mb-6">
            Какво е всъщност Блокчейн?
          </h1>
          <p className="text-lg mb-4">
            Блокчейн е{" "}
            <span className="text-blue-400 font-semibold">
              децентрализирана
            </span>{" "}
            и <span className="text-teal-300 font-semibold">разпределена</span>{" "}
            технология, която съхранява информация в последователност от
            блокове, свързани чрез криптографски механизми.
          </p>

          <h2 className="text-3xl text-gray-300 font-semibold mt-6">
            Основни характеристики
          </h2>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <span className="text-blue-300 font-semibold">
                Децентрализация
              </span>{" "}
              – няма централен орган, който да контролира данните.
            </li>
            <li>
              <span className="text-teal-500 font-semibold">Прозрачност</span> –
              всеки участник в мрежата може да провери информацията.
            </li>
            <li>
              <span className="text-purple-300 font-semibold">Неизменност</span>{" "}
              – записите не могат да бъдат променяни или изтривани.
            </li>
          </ul>

          <h2 className="text-3xl text-gray-300 font-semibold mt-6">
            Как работи Блокчейн?
          </h2>
          <p className="mt-4">
            Всеки блок съдържа информация за транзакции, уникален идентификатор
            (хеш) и хеша на предишния блок, което създава{" "}
            <span className="text-blue-400 font-semibold">
              верига от блокове
            </span>
            . Това прави технологията изключително сигурна и устойчива на
            манипулации.
          </p>

          <h2 className="text-3xl text-gray-300 font-semibold mt-6">
            Приложения на Блокчейн
          </h2>
          <p className="mt-4">
            Технологията намира приложение в различни индустрии:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <span className="text-teal-400 font-semibold">Криптовалути</span>{" "}
              – Bitcoin, Ethereum и други.
            </li>
            <li>
              <span className="text-blue-300 font-semibold">
                Финансови услуги
              </span>{" "}
              – сигурни и прозрачни транзакции.
            </li>
            <li>
              <span className="text-purple-300 font-semibold">
                Здравеопазване
              </span>{" "}
              – сигурно съхранение на медицински досиета.
            </li>
            <li>
              <span className="text-gray-400 font-semibold">
                Управление на веригите за доставки
              </span>{" "}
              – проследяване на стоки в реално време.
            </li>
          </ul>

          <h2 className="text-3xl text-gray-300 font-semibold mt-6">
            Заключение
          </h2>
          <p className="mt-4">
            Блокчейн е{" "}
            <span className="text-teal-500 font-semibold">
              революционна технология
            </span>
            , която трансформира начина, по който обменяме информация и
            стойност. С нейната помощ можем да изградим по-сигурни, прозрачни и
            ефективни системи.
          </p>

          <p className="mt-6">
            Научи повече:{" "}
            <Link
              to="https://bitcoin.org/bg/how-it-works"
              className="text-sky-600 underline"
            >
              Как работи Биткойн?
            </Link>
          </p>
          <div className=" mx-auto py-8">
    <h1 className="text-3xl font-bold mb-6 text-primary">Какво е Блокчейн?</h1>

    <p className="mb-4">
      Блокчейн е децентрализирана цифрова книга (ledger), която съхранява данни в блокове, свързани помежду си с криптографски методи.
      Всеки блок съдържа запис на множество транзакции и е свързан с предходния блок чрез криптографски хеш. Така се създава верига от блокове – „блокчейн“.
    </p>
    <p className="mb-4">
      Основната характеристика на блокчейн е неговата неизменимост – веднъж записана, информацията в блоковете не може да бъде променена без съгласие на мнозинството в мрежата.
      Това го прави изключително сигурна технология, подходяща за множество индустрии.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">Как работи Блокчейн?</h2>
    <p className="mb-4">
      Когато дадена транзакция се инициира в блокчейн мрежа, тя преминава през следния процес:
    </p>

    <ol className="list-decimal list-inside mb-6 space-y-2">
      <li>Транзакцията се разпространява в децентрализирана мрежа от компютри (възли).</li>
      <li>Мрежата валидира транзакцията чрез консенсусен механизъм (напр. Proof of Work, Proof of Stake).</li>
      <li>След потвърждение, транзакцията се групира с други транзакции в блок.</li>
      <li>Блокът се добавя към съществуващата верига – Blockchain.</li>
      <li>Записът става публичен и неизменим.</li>
    </ol>

    <p className="mb-4">
      Всеки блок съдържа:
    </p>
    <ul className="list-disc list-inside mb-6 space-y-1">
      <li>Данни за транзакции</li>
      <li>Хеш на текущия блок</li>
      <li>Хеш на предишния блок</li>
      <li>Времеви печат (timestamp)</li>
    </ul>

    <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">Предимства на Блокчейн</h2>
    <ul className="list-disc list-inside mb-6 space-y-2">
      <li><strong>Децентрализация:</strong> Няма централен контрол – всички участници имат достъп и могат да проверяват записите.</li>
      <li><strong>Прозрачност:</strong> Всички транзакции са публични и проследими.</li>
      <li><strong>Сигурност:</strong> Използва криптографски алгоритми за защита от неоторизирани промени.</li>
      <li><strong>Неизменимост:</strong> Веднъж записани, данните не могат да бъдат променени без общо съгласие.</li>
      <li><strong>Автоматизация:</strong> Възможност за използване на умни договори за автоматично изпълнение на условия.</li>
    </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">История и Развитие</h2>
    <p className="mb-4">
      Идеята за децентрализирана цифрова книга се ражда още в началото на 90-те години, но реалното ѝ развитие започва с появата на Биткойн през 2009 г.
      от анонимна личност или група под името Сатоши Накамото.
    </p>
    <p className="mb-4">
      Оттогава насам технологията блокчейн намира приложение извън света на криптовалутите – във финансови услуги, логистика, здравеопазване, гласуване и още много.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">Приложения на Блокчейн</h2>
    <ul className="list-disc list-inside mb-6 space-y-2">
      <li><strong>Криптовалути:</strong> Основната и най-известна употреба – Биткойн, Етериум и други.</li>
      <li><strong>Вериги за доставки:</strong> Проследимост на стоки от производител до потребител.</li>
      <li><strong>Гласуване:</strong> Прозрачност и сигурност в изборни процеси.</li>
      <li><strong>Идентичност:</strong> Децентрализирани дигитални идентичности.</li>
      <li><strong>Умни договори и DeFi:</strong> Финансови продукти без посредници.</li>
    </ul>

    <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">Недостатъци и Предизвикателства</h2>
    <ul className="list-disc list-inside mb-6 space-y-2">
      <li><strong>Скорост и мащабируемост:</strong> Ограничен брой транзакции в секунда.</li>
      <li><strong>Енергийна консумация:</strong> При PoW мрежи като Биткойн – високи енергийни разходи.</li>
      <li><strong>Регулации:</strong> Разнообразни и все още развиващи се регулаторни рамки.</li>
      <li><strong>Ниска осведоменост:</strong> Много потребители и компании все още не разбират потенциала на блокчейн.</li>
    </ul>

    <p className="mb-10">
      Въпреки предизвикателствата, блокчейн продължава да се развива и утвърждава като фундаментална технология за бъдещето на цифровите услуги.
    </p>
  </div>

        </motion.div>
      </div>
    </>
  );
}
