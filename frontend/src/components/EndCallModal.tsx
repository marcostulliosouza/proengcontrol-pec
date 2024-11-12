import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getDetractorList } from '../api/detractorApi';

type Detractor = {
  dtr_id: string;
  dtr_descricao: string;
  dtr_tipo: number;
  tch_descricao: string;
  dtr_indicador: number;
};

type EndCallModalProps = {
  detractor?: Detractor;
  onClose: () => void;
  onConfirm: (detractor: string, description: string) => void;
};

const EndCallModal: React.FC<EndCallModalProps> = ({ onClose, onConfirm }) => {
  const [detractors, setDetractors] = useState<Detractor[]>([]);
  const [selectedDetractor, setSelectedDetractor] = useState<Detractor | null>(null);
  const [description, setDescription] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchDetractors = async () => {
      const detractorsList = await getDetractorList();
      setDetractors(detractorsList);
    };
    fetchDetractors();
  }, []);

  const handleConfirm = () => {
    if (!selectedDetractor || description.length === 0) {
      alert('Por favor, selecione um detrator e insira uma descrição.');
      return;
    }
    onConfirm(selectedDetractor.dtr_id, description);
  };

  // Função para verificar o texto usando a API do LanguageTool
  const checkGrammar = async (text: string) => {
    const response = await fetch(
      `https://api.languagetool.org/v2/check?language=pt-BR&text=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    const newSuggestions = data.matches.map((match: any) => match.replacements[0]?.value || '');
    setSuggestions(newSuggestions);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    // Realizar verificação após o usuário parar de digitar (debounce)
    clearTimeout((window as any).checkGrammarTimeout);
    (window as any).checkGrammarTimeout = setTimeout(() => {
      checkGrammar(newDescription);
    }, 500);
  };

  // Mapear os detratores para o formato esperado pelo react-select
  const options = detractors.map((d) => ({
    value: d.dtr_id,
    label: d.dtr_descricao,
    dtr_indicador: d.dtr_indicador,
  }));

  // Estilos customizados para o Select
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.data.dtr_indicador === 0 ? '#d1d5db' : '#ffffff',
      color: '#000',
    }),
    control: (provided: any) => ({
      ...provided,
      borderColor: '#d1d5db',
    }),
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-80 max-w-96 w-full">
        <h2 className="text-lg font-semibold mb-4">Finalizar Chamado</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Lista de Detratores:</label>
          <Select
            value={selectedDetractor ? { value: selectedDetractor.dtr_id, label: selectedDetractor.dtr_descricao } : null}
            onChange={(option: any) => setSelectedDetractor(detractors.find(d => d.dtr_id === option.value) || null)}
            options={options}  // Passando o array com objetos no formato esperado
            styles={customStyles}
            placeholder="Escolha um detrator"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Descrição:</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            maxLength={250}
            placeholder="Descreva o que foi feito..."
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none uppercase"
            rows={4}
          />
          <p className="text-gray-500 text-xs mt-1">{description.length} / 250 caracteres</p>
          {suggestions.length > 0 && (
            <div className="text-red-500 text-xs mt-1">
              <strong>Sugestões de correção:</strong>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex gap-4 mt-4 justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndCallModal;
