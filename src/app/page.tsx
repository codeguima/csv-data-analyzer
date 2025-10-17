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

const CSVAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Selecione um arquivo CSV primeiro!");
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Troque pela URL da sua API Python
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center">
      {/* HERO SECTION */}
      <header className="text-center py-20 px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-primary-500 to-secondary-500">
          CSV Data Analyzer
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Faça upload de um arquivo CSV e visualize análises de dados e gráficos
          interativos gerados automaticamente.
        </p>
      </header>

      {/* UPLOAD CARD */}
      <section className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-lg text-center border border-gray-800 hover:border-primary-500 transition">
        <h2 className="text-2xl font-semibold mb-4">Importe seu arquivo CSV</h2>

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 text-gray-300"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {loading ? "Processando..." : "Analisar CSV"}
        </button>

        {error && <p className="text-red-400 mt-4">{error}</p>}
      </section>

      {/* FEATURES SECTION */}
      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mt-20 px-6">
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-primary-500 transition text-center">
          <h3 className="text-xl font-semibold mb-2">📈 Análises Automáticas</h3>
          <p className="text-gray-400">
            Detecta colunas numéricas e gera visualizações para compreender padrões rapidamente.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-secondary-500 transition text-center">
          <h3 className="text-xl font-semibold mb-2">📊 Gráficos Interativos</h3>
          <p className="text-gray-400">
            Explore seus dados com gráficos dinâmicos de linha, barra ou dispersão.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-primary-500 transition text-center">
          <h3 className="text-xl font-semibold mb-2">⚙️ Machine Learning</h3>
          <p className="text-gray-400">
            Envie seus dados para a API Python e receba insights com modelos de ML em tempo real.
          </p>
        </div>
      </section>

      {/* GRAPH SECTION */}
      {data.length > 0 && (
        <section className="mt-20 w-full max-w-5xl bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-br from-primary-500 to-secondary-500">
            Visualização dos Dados
          </h2>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey={columns[0]} stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={columns[1]}
                stroke="#00d9ff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      )}

      {/* FOOTER */}
      <footer className="mt-20 py-6 text-gray-500 text-sm border-t border-gray-800 w-full text-center">
        © {new Date().getFullYear()} CSV Analyzer — Desenvolvido com 💙 e dados.
      </footer>
    </div>
  );
};

export default CSVAnalyzer;
