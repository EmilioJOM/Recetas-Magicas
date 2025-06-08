// Al inicio: importaciones
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Animated,
  Easing,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FancyInput from '../components/FancyInput';

export default function SearchBarWithFilters({
  searchText,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  filtros = [],
  tiposSeleccionados = [],
  setTiposSeleccionados = () => {},
  tiposDisponibles = [],
  onResetTipos = () => {},
  usuarioFiltro,
  setUsuarioFiltro = () => {},
  onResetUsuario = () => {},
  ingredientesSeleccionados = [],
  setIngredientesSeleccionados = () => {},
  ingredientesDisponibles = [],
  onResetIngredientes = () => {},
}) {
  // --- Estados para modales ---
  const [showTipoModal, setShowTipoModal] = useState(false);
  const [showUsuarioModal, setShowUsuarioModal] = useState(false);
  const [showIngredienteModal, setShowIngredienteModal] = useState(false);

  const slideAnim = useRef(new Animated.Value(400)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const slideAnimUsuario = useRef(new Animated.Value(400)).current;
  const overlayOpacityUsuario = useRef(new Animated.Value(0)).current;

  const slideAnimIngrediente = useRef(new Animated.Value(400)).current;
  const overlayOpacityIngrediente = useRef(new Animated.Value(0)).current;

  // --- Activos ---
  const isTipoActivo = tiposSeleccionados.length > 0;
  const isUsuarioActivo = usuarioFiltro && usuarioFiltro.length > 0;
  const isIngredienteActivo = ingredientesSeleccionados.length > 0;

  // --- Efectos de activación de filtro seleccionado ---
  useEffect(() => {
    if (isTipoActivo) onFilterChange('Tipo');
    else if (selectedFilter === 'Tipo') onFilterChange(null);
  }, [tiposSeleccionados]);

  useEffect(() => {
    if (isUsuarioActivo) onFilterChange('Usuario');
    else if (selectedFilter === 'Usuario') onFilterChange(null);
  }, [usuarioFiltro]);

  useEffect(() => {
    if (isIngredienteActivo) onFilterChange('Ingrediente');
    else if (selectedFilter === 'Ingrediente') onFilterChange(null);
  }, [ingredientesSeleccionados]);

  // --- Toggle múltiple ---
  const toggleTipo = (tipo) => {
    setTiposSeleccionados(
      tiposSeleccionados.includes(tipo)
        ? tiposSeleccionados.filter((t) => t !== tipo)
        : [...tiposSeleccionados, tipo]
    );
  };

  const toggleIngrediente = (ingrediente) => {
    setIngredientesSeleccionados(
      ingredientesSeleccionados.includes(ingrediente)
        ? ingredientesSeleccionados.filter((i) => i !== ingrediente)
        : [...ingredientesSeleccionados, ingrediente]
    );
  };

  // --- Animaciones de modales ---
  const openModal = (setShow, slide, overlay) => {
    setShow(true);
    Animated.parallel([
      Animated.timing(slide, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(overlay, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = (setShow, slide, overlay) => {
    Animated.parallel([
      Animated.timing(slide, {
        toValue: 400,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(overlay, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setShow(false));
  };

  // --- PanResponders ---
  const createPanResponder = (slide, closeFn) =>
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 10,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) slide.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 100) closeFn();
        else
          Animated.timing(slide, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
      },
    });

  const panResponder = useRef(createPanResponder(slideAnim, () => closeModal(setShowTipoModal, slideAnim, overlayOpacity))).current;
  const panResponderUsuario = useRef(createPanResponder(slideAnimUsuario, () => closeModal(setShowUsuarioModal, slideAnimUsuario, overlayOpacityUsuario))).current;
  const panResponderIngrediente = useRef(createPanResponder(slideAnimIngrediente, () => closeModal(setShowIngredienteModal, slideAnimIngrediente, overlayOpacityIngrediente))).current;

  return (
    <View>
      {/* Buscador */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar..."
          value={searchText}
          onChangeText={onSearchChange}
          style={styles.searchInput}
        />
      </View>

      {/* Filtros */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContainer}>
        {filtros.map((filtro) => {
          const isTipo = filtro === 'Tipo';
          const isUsuario = filtro === 'Usuario';
          const isIngrediente = filtro === 'Ingrediente';
          const isActive = isTipo
            ? isTipoActivo
            : isUsuario
            ? isUsuarioActivo
            : isIngrediente
            ? isIngredienteActivo
            : selectedFilter === filtro;

          return (
            <TouchableOpacity
              key={filtro}
              style={[styles.filterButton, isActive && styles.activeFilterButton]}
              onPress={() => {
                if (isTipo) openModal(setShowTipoModal, slideAnim, overlayOpacity);
                else if (isUsuario) openModal(setShowUsuarioModal, slideAnimUsuario, overlayOpacityUsuario);
                else if (isIngrediente) openModal(setShowIngredienteModal, slideAnimIngrediente, overlayOpacityIngrediente);
                else onFilterChange(filtro);
              }}
            >
              <Text style={[styles.filterText, isActive && styles.activeFilterText]}>{filtro}</Text>
              {(isTipo || isUsuario || isIngrediente) && (
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={isActive ? '#fff' : '#555'}
                  style={{ marginLeft: 4 }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Modal Tipo */}
      <Modal visible={showTipoModal} animationType="none" transparent onRequestClose={() => closeModal(setShowTipoModal, slideAnim, overlayOpacity)}>
        <View style={styles.modalContainer}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => closeModal(setShowTipoModal, slideAnim, overlayOpacity)}>
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
          </Pressable>
          <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slideAnim }] }]} {...panResponder.panHandlers}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.sheetTitle}>Seleccioná los tipos</Text>
              <TouchableOpacity onPress={() => { onResetTipos(); setTiposSeleccionados([]); }}>
                <Text style={styles.resetButton}>Restablecer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View style={styles.tipoChipsContainer}>
              {tiposDisponibles.map((tipo) => (
                <TouchableOpacity key={tipo} style={[styles.tipoChip, tiposSeleccionados.includes(tipo) && styles.activeTipoChip]} onPress={() => toggleTipo(tipo)}>
                  <Text style={[styles.tipoChipText, tiposSeleccionados.includes(tipo) && styles.activeTipoChipText]}>{tipo}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.acceptButton} onPress={() => closeModal(setShowTipoModal, slideAnim, overlayOpacity)}>
              <Text style={styles.acceptButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* Modal Usuario */}
      <Modal visible={showUsuarioModal} animationType="none" transparent onRequestClose={() => closeModal(setShowUsuarioModal, slideAnimUsuario, overlayOpacityUsuario)}>
        <View style={styles.modalContainer}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => closeModal(setShowUsuarioModal, slideAnimUsuario, overlayOpacityUsuario)}>
            <Animated.View style={[styles.overlay, { opacity: overlayOpacityUsuario }]} />
          </Pressable>
          <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slideAnimUsuario }] }]} {...panResponderUsuario.panHandlers}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.sheetTitle}>Filtrar por usuario</Text>
              <TouchableOpacity onPress={() => { onResetUsuario(); setUsuarioFiltro(''); }}>
                <Text style={styles.resetButton}>Restablecer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <FancyInput placeholder="Escribí el nombre de usuario" value={usuarioFiltro} onChangeText={setUsuarioFiltro} style={styles.usuarioInput} autoFocus />
            <TouchableOpacity style={styles.acceptButton} onPress={() => closeModal(setShowUsuarioModal, slideAnimUsuario, overlayOpacityUsuario)}>
              <Text style={styles.acceptButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* Modal Ingrediente (nuevo) */}
      <Modal visible={showIngredienteModal} animationType="none" transparent onRequestClose={() => closeModal(setShowIngredienteModal, slideAnimIngrediente, overlayOpacityIngrediente)}>
        <View style={styles.modalContainer}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => closeModal(setShowIngredienteModal, slideAnimIngrediente, overlayOpacityIngrediente)}>
            <Animated.View style={[styles.overlay, { opacity: overlayOpacityIngrediente }]} />
          </Pressable>
          <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slideAnimIngrediente }] }]} {...panResponderIngrediente.panHandlers}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.sheetTitle}>Seleccioná los ingredientes</Text>
              <TouchableOpacity onPress={() => { onResetIngredientes(); setIngredientesSeleccionados([]); }}>
                <Text style={styles.resetButton}>Restablecer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View style={styles.tipoChipsContainer}>
              {ingredientesDisponibles.map((ingrediente) => (
                <TouchableOpacity key={ingrediente} style={[styles.tipoChip, ingredientesSeleccionados.includes(ingrediente) && styles.activeTipoChip]} onPress={() => toggleIngrediente(ingrediente)}>
                  <Text style={[styles.tipoChipText, ingredientesSeleccionados.includes(ingrediente) && styles.activeTipoChipText]}>{ingrediente}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.acceptButton} onPress={() => closeModal(setShowIngredienteModal, slideAnimIngrediente, overlayOpacityIngrediente)}>
              <Text style={styles.acceptButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}



const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterScroll: {
    marginBottom: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeFilterButton: {
    backgroundColor: '#E08D3E',
  },
  filterText: {
    color: '#555',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 32,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E08D3E',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 12,
  },
  tipoChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tipoChip: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeTipoChip: {
    backgroundColor: '#E08D3E',
  },
  tipoChipText: {
    color: '#555',
    fontWeight: '600',
  },
  activeTipoChipText: {
    color: '#fff',
  },
  acceptButton: {
    backgroundColor: '#E08D3E',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
