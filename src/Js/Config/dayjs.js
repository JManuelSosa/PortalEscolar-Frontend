// dayjs-config.js
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';

const plugins = [
  customParseFormat,    // Para parsear formatos personalizados
  localizedFormat,      // Para formatos localizados
  relativeTime,         // Para tiempos relativos (hace 2 días)
  weekOfYear,           // Para semanas del año
  advancedFormat        // Formatos avanzados
];

plugins.forEach(plugin => dayjs.extend(plugin));

dayjs.locale('es');

export default dayjs;