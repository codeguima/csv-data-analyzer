"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Upload, BarChart3, Brain, FileSpreadsheet } from "lucide-react";

const CSVAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    crop: "",
    year: "",
    season: "",
    area: "",
    production: "",
    rain_mm: "",
    fertilizer_kg_ha: "",
    pesticide_kg_ha: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    if (!file) return alert("Selecione um arquivo CSV primeiro!");
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filters", JSON.stringify(filters));

    try {
      // URL da API Python
      const res = await fetch("https://sua-api-python.com/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao processar o CSV");
      const json = await res.json();
      setColumns(json.columns);
      setData(json.data);
    } catch (err: any) {
      setError(err.message || "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col items-center">
      {/* HERO SECTION */}
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20 px-6 max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">
          🌾 CSV Data Analyzer
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Faça upload de um arquivo CSV, aplique filtros e visualize previsões e análises com IA de forma interativa.
        </p>
      </motion.header>

      {/* UPLOAD CARD */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-2xl text-center border border-gray-800 hover:border-cyan-500/50 transition"
      >
        <h2 className="text-2xl font-semibold mb-6 flex justify-center items-center gap-2">
          <FileSpreadsheet className="text-cyan-400" /> Importar CSV
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <input name="crop" onChange={handleChange} placeholder="🌱 Cultura" className="input" />
          <input name="year" type="number" onChange={handleChange} placeholder="📅 Ano" className="input" />
          <select name="season" onChange={handleChange} className="input bg-gray-800">
            <option value="">☀️ Estação</option>
            <option value="inverno">Inverno</option>
            <option value="verão">Verão</option>
          </select>
          <input name="area" type="number" onChange={handleChange} placeholder="📏 Área (ha)" className="input" />
          <input name="production" type="number" onChange={handleChange} placeholder="⚙️ Produção (t)" className="input" />
          <input name="rain_mm" type="number" onChange={handleChange} placeholder="🌧️ Chuva (mm)" className="input" />
          <input name="fertilizer_kg_ha" type="number" onChange={handleChange} placeholder="🧪 Fertilizante (kg/ha)" className="input" />
          <input name="pesticide_kg_ha" type="number" onChange={handleChange} placeholder="☠️ Pesticida (kg/ha)" className="input" />
        </div>

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-6 w-full text-gray-300"
        />

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition"
        >
          {loading ? (
            <span className="animate-pulse">🔄 Processando...</span>
          ) : (
            <>
              <Upload className="w-5 h-5" /> Analisar CSV
            </>
          )}
        </motion.button>

        {error && <p className="text-red-400 mt-4">{error}</p>}
      </motion.section>

      {/* FEATURES SECTION */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mt-20 px-6">
        {[
          {
            icon: <BarChart3 className="w-8 h-8 text-cyan-400" />,
            title: "Análises Automáticas",
            desc: "Detecta colunas numéricas e gera visualizações inteligentes para compreender padrões rapidamente.",
          },
          {
            icon: <Brain className="w-8 h-8 text-purple-400" />,
            title: "Machine Learning",
            desc: "Receba previsões e insights instantâneos com modelos de IA integrados.",
          },
          {
            icon: <FileSpreadsheet className="w-8 h-8 text-blue-400" />,
            title: "Relatórios Visuais",
            desc: "Transforme seus dados agrícolas em gráficos e tendências de alta precisão.",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 hover:border-cyan-400/50 transition text-center"
          >
            <div className="mb-3 flex justify-center">{f.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* GRAPH SECTION */}
      {data.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20 w-full max-w-5xl bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500">
            Visualização dos Dados
          </h2>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey={columns[0]} stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }} />
              <Line
                type="monotone"
                dataKey={columns[1]}
                stroke="#00d9ff"
                strokeWidth={2.5}
                dot={{ stroke: "#00d9ff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.section>
      )}

      {/* FOOTER */}
      <footer className="mt-20 py-6 text-gray-500 text-sm border-t border-gray-800 w-full text-center">
        © {new Date().getFullYear()} <span className="text-cyan-400">CSV Analyzer</span> — Feito com 💙 e dados.
      </footer>
    </div>
  );
};

// Tailwind component shortcuts
const inputClass =
  "p-2 rounded-lg bg-gray-800/70 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none transition";
Object.defineProperty(globalThis, "input", {
  get: () => inputClass,
});

export default CSVAnalyzer;
