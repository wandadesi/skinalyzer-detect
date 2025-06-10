interface AnalyzeProps {
  concern: string;
  ingredients: string;
}

export default function Analyze({ concern, ingredients }: AnalyzeProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-left space-y-3 border border-gray-200">
      <h2 className="font-playfair italic text-2xl text-blue-600 font-semibold">
        Hi Dear, here’s your result!
      </h2>

      <div>
        <p className="font-montserrat! text-gray-800 font-semibold">Skin Concern Identified:</p>
        <p className="font-montserrat! text-blue-500 text-lg">{concern}</p>
      </div>

      <div>
        <p className="font-montserrat! text-gray-800 font-semibold">Suggested Ingredients:</p>
        <p className="font-montserrat! text-blue-500 text-lg">{ingredients}</p>
      </div>
    </div>
  );
}
