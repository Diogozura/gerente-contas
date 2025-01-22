import { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Modal,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tabs,
  Tab,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  IconButton,
} from "@mui/material";
import Bread from "../../components/ui/Breadcrumbs";
// import Swiper from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Head from "next/head";
import { styled } from '@mui/system';
import Image from "next/image";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InputMoney from "../../components/Inputs/InputMoney";
import { TabPanelProps } from "@/types/tabPanelProps";



function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}






export default function CriacaoProduto() {
  const router = useRouter();
  const [newProduct, setNewProduct] = useState({
    id: 0,
    titulo: "",
    sku: "",
    ean: "",
    estoque: 0,
    estoqueMin: 0,
    estoqueMax: 0,
    crossdocking: 0,
    estoqueCd: 0,
    estoqueCdMin: 0,
    estoqueCdMax: 0,
    localizacao: '',
    dataCompra: "",
    marca: "",
    modelo: "",
    altura: 0,
    largura: 0,
    unidade: "",
    profundidade: 0,
    pesoLiquido: 0,
    pesoBruto: 0,
    descricao: "",
    imagens: [] as File[],
    listaPrecos: [] as { variacao: string; precoMinimo: number }[],
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [garantiaTipo, setGarantiaTipo] = useState('semGarantia');
  const [garantiaValor, setGarantiaValor] = useState('');
  const [garantiaPeriodo, setGarantiaPeriodo] = useState('dias');
  const [tab, setTab] = useState(0);



  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleChange = (field: string, value: string | number) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: typeof value === "number" && value < 0 ? 0 : value,
    }));

  };
  // Campos obrigatórios
  const camposObrigatorios = ['titulo', 'sku'];

  // Verifica se todos os campos obrigatórios estão preenchidos
  const isFormValid = camposObrigatorios.every(
    (campo) => newProduct[campo]?.toString().trim() !== ''
  );

  const handleTipoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGarantiaTipo(event.target.value);
    if (event.target.value === 'semGarantia') {
      setGarantiaValor('');
    }
  };

  const handleGenerateDescription = () => {
    const { titulo, marca, modelo, altura, largura, profundidade, pesoLiquido } = newProduct;
    const descricao = `Produto: ${titulo},\n Marca: ${marca},\n Modelo: ${modelo},\n Dimensões: ${altura}x${largura}x${profundidade} cm,\n Peso Líquido: ${pesoLiquido} g.\n`;
    setNewProduct((prev) => ({ ...prev, descricao }));
  };

  const saveProduct = () => {
    const storedProducts = localStorage.getItem("produtos");
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    const updatedProducts = [
      ...products,
      { ...newProduct, id: products.length + 1 },
    ];
    localStorage.setItem("produtos", JSON.stringify(updatedProducts));
    router.push("/estoque");
  };


  // Upload de imagens corrigido
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const imagensValidas = [...newProduct.imagens];
    for (let i = 0; i < files.length; i++) {
      if (imagensValidas.length < 6) imagensValidas.push(files[i]);
    }

    setNewProduct((prev) => ({
      ...prev,
      imagens: imagensValidas,
    }));
  };
  const handleImageClick = (index: number) => {
    const image = newProduct.imagens[index];
    if (image) {
      setSelectedImage(URL.createObjectURL(image)); // Define a URL da imagem selecionada
    }
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  const nav = {
    principal: "estoque",
    atual: "criacao-produto",
  };
  const [variacao, setVariacao] = useState("");
  const [precoMinimo, setPrecoMinimo] = useState<number>(0);
  // Adicionar item à lista de preços
  const adicionarListaPreco = () => {
    if (variacao && precoMinimo) {
      setNewProduct((prev) => ({
        ...prev,
        listaPrecos: [...prev.listaPrecos, { variacao, precoMinimo }],
      }));
      setVariacao("");
      setPrecoMinimo(0);
    }
  };

  // Remover item da lista de preços
  const removerListaPreco = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      listaPrecos: prev.listaPrecos.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <Head>
        <title>Hubeefive - Criar produto</title>
      </Head>
      <Container >
        <Bread nav={nav} />
        <Typography  variant="h4" id='create-product' gutterBottom>
          Criar Produto
        </Typography>
        <Grid item xs={12}>
          <Button  id="produtos-criar" variant="contained" color="primary" disabled={!isFormValid} onClick={saveProduct}>
            Salvar Produto
          </Button>
        </Grid>

        <Tabs value={tab} onChange={handleTabChange} aria-label="product tabs" centered>
          <Tab label="Ficha do Produto" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="Estoque" id="tab-1" aria-controls="tabpanel-1" />
          <Tab label="Tributação" id="tab-2" aria-controls="tabpanel-2" disabled />
        </Tabs>
      </Container>
      {/* Ficha tecnina com produto  */}
      <TabPanel value={tab} index={0}>
        {/* Imagens upload  */}
        <Grid >
          {/* Carrossel de pré-visualização */}
          {newProduct.imagens.length > 0 && (
            <Grid item xs={12}>
              <Swiper
                spaceBetween={10}
                slidesPerView={3}
                style={{ height: "150px", marginTop: "20px" }}
              >
                {newProduct.imagens.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        border: "1px solid #ccc",
                      }}
                      onClick={() => handleImageClick(idx)}
                    >
                      <Image
                        src={URL.createObjectURL(img)}
                        alt={`Imagem ${idx + 1}`}
                        width={400}
                        height={400}
                      // style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          )}
          {/* Modal para exibir a imagem em tamanho grande */}
          <Modal open={!!selectedImage} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 2,
              }}
            >
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Imagem ampliada"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              )}
            </Box>
          </Modal>
          <Grid item xs={12}>

            <FormHelperText>
              {`Imagens selecionadas: ${newProduct.imagens.length}/6`}
            </FormHelperText>
            <Button
              variant="contained"
              component="label"
              color="primary"
              disabled={newProduct.imagens.length >= 6}
            >
              Upload de Imagens
              <input
                type="file"
                hidden
                accept=".jpg, .jpeg, .png"
                multiple
                onChange={handleImageUpload}
              />
            </Button>
          </Grid>
        </Grid>
        {/* Informações do produto  */}
        <Grid xs={9}>
          <Grid container p={1} spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Título"
                fullWidth
                value={newProduct.titulo}
                required
                onChange={(e) => handleChange("titulo", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              {/* {espaço vago} */}
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Código SKU"
                fullWidth
                value={newProduct.sku}
                onChange={(e) => handleChange("sku", e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Código EAN"
                fullWidth
                value={newProduct.ean}
                onChange={(e) => handleChange("ean", e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Unidade"
                fullWidth
                value={newProduct.unidade}
                onChange={(e) => handleChange("unidade", e.target.value)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Altura (cm)"
                type="number"
                fullWidth
                value={newProduct.altura}
                onChange={(e) => handleChange("altura", parseInt(e.target.value, 10))}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Largura (cm)"
                type="number"
                fullWidth
                value={newProduct.largura}
                onChange={(e) => handleChange("largura", parseInt(e.target.value, 10))}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Profundidade (cm)"
                type="number"
                fullWidth
                value={newProduct.profundidade}
                onChange={(e) => handleChange("profundidade", parseInt(e.target.value, 10))}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Modelo"
                fullWidth
                value={newProduct.modelo}
                onChange={(e) => handleChange("modelo", e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Marca"
                fullWidth
                value={newProduct.marca}
                onChange={(e) => handleChange("marca", e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Peso Líquido (g)"
                type="number"
                fullWidth
                value={newProduct.pesoLiquido}
                onChange={(e) => handleChange("pesoLiquido", parseInt(e.target.value, 10))}
              />
            </Grid>
            {/* Garantia  */}
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Garantia
              </Typography>
              <Typography variant="body2" gutterBottom>
                {garantiaTipo === 'garantiaFabrica' && garantiaValor
                  ? `Você oferece garantia de fábrica por ${garantiaValor} ${garantiaPeriodo}.`
                  : garantiaTipo === 'garantiaVendedor' && garantiaValor
                    ? `Você oferece garantia do vendedor por ${garantiaValor} ${garantiaPeriodo}.`
                    : 'Nenhuma garantia selecionada.'}
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="garantia"
                  value={garantiaTipo}
                  onChange={handleTipoChange}
                >
                  <FormControlLabel
                    value="garantiaVendedor"
                    control={<Radio />}
                    label="Garantia do vendedor"
                  />
                  <FormControlLabel
                    value="garantiaFabrica"
                    control={<Radio />}
                    label="Garantia de fábrica"
                  />

                  <FormControlLabel
                    value="semGarantia"
                    control={<Radio />}
                    label="Sem garantia"
                  />

                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid p={4} xs={12} spacing={2}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <Typography color={'primary'} variant="h5" component={'h3'} fontWeight={500}>
                    Lista de preços
                  </Typography>
                  <Typography variant="body1" component={'p'} >
                    Crie variações de preços para diferentes tipos ou canais de venda
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* Lista de Preços */}
                  <Box mt={3}>
                    <Typography variant="h6">Lista de Preços</Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={4}>
                        <TextField
                          label="Variação"
                          fullWidth
                          value={variacao}
                          onChange={(e) => setVariacao(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <InputMoney
                          label="Preço Mínimo"
                          name="PrecoMinimo"
                        />
                  
                      </Grid>
                      <Grid item xs={2}>
                        <Button variant="contained" onClick={adicionarListaPreco}>
                          Adicionar
                        </Button>
                      </Grid>
                    </Grid>

                    {/* Renderizar Lista de Preços */}
                    {newProduct.listaPrecos.map((item, index) => (
                      <Grid
                        key={index}
                        container
                        spacing={2}
                        alignItems="center"
                        mt={1}
                        sx={{ borderBottom: "1px solid #ccc", pb: 1 }}
                      >
                        <Grid item xs={4}>
                          <Typography>{item.variacao}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>R$ {item.precoMinimo.toLocaleString('pt-br', {style: 'decimal', minimumSignificantDigits: 3})}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton onClick={() => removerListaPreco(index)}>
                            <DeleteOutlineOutlinedIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </Box>
                </AccordionDetails>

              </Accordion>

            </Grid>

            <Grid p={4} spacing={2} xs={12}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <Typography color={'primary'} variant="h5" component={'h3'} fontWeight={500}>
                    Descrição
                  </Typography>


                </AccordionSummary>
                <AccordionDetails>
                  <Grid item xs={12}>
                    <TextField
                      label="Descrição do Produto"
                      multiline
                      fullWidth
                      value={newProduct.descricao}
                      onChange={(e) => handleChange("descricao", e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleGenerateDescription}
                    >
                      Gerar Descrição
                    </Button>
                  </Grid>
                </AccordionDetails>

              </Accordion>

            </Grid>
          </Grid>
          <Grid />
        </Grid>


      </TabPanel>
      {/*controle de  Estoque produto  */}
      <TabPanel value={tab} index={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              {newProduct?.titulo}
            </Typography>
            <Typography>
              última alteração em :data/hora { }
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <TextField
              label="Estoque Local"
              type="number"
              fullWidth
              value={newProduct.estoque}
              onChange={(e) => handleChange("estoque", parseInt(e.target.value, 10))}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Estoque minimo"
              type="number"
              fullWidth
              value={newProduct.estoqueMin}
              onChange={(e) => handleChange("estoqueMin", parseInt(e.target.value, 10))}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Estoque Máximo"
              type="number"
              fullWidth
              value={newProduct.estoqueMax}
              onChange={(e) => handleChange("estoqueMax", parseInt(e.target.value, 10))}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Crossdocking"
              type="number"
              fullWidth
              disabled
              value={newProduct.crossdocking}
              onChange={(e) => handleChange("crossdocking", parseInt(e.target.value, 10))}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Localização"
              type="Text"
              fullWidth
              disabled
              value={newProduct.localizacao}
              onChange={(e) => handleChange("localizacao", parseInt(e.target.value, 10))}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Estoque em CD"
              type="number"
              fullWidth
              value={newProduct?.estoqueCd}
              onChange={(e) => handleChange("estoqueCd", parseInt(e.target.value, 10))}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Estoque Mínimo"
              type="number"
              fullWidth
              value={newProduct?.estoqueCdMin}
              onChange={(e) => handleChange("estoqueCdMin", parseInt(e.target.value, 10))}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Estoque máximo"
              type="number"
              fullWidth
              value={newProduct?.estoqueCdMax}
              onChange={(e) => handleChange("estoqueCdMax", parseInt(e.target.value, 10))}
            />
          </Grid>
        </Grid>
      </TabPanel>
      {/*controle tributação do produto  */}
      <TabPanel value={tab} index={2}>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField
              label="Código SKU"
              fullWidth
              value={newProduct.sku}
              onChange={(e) => handleChange("sku", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Código EAN"
              fullWidth
              value={newProduct.ean}
              onChange={(e) => handleChange("ean", e.target.value)}
            />
          </Grid>
        </Grid>
      </TabPanel>



    </>
  );
}
