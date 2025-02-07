import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  FormHelperText,
  Modal,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Input,
  Chip,
} from "@mui/material";

// import Swiper from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Head from "next/head";
import Image from "next/image";

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { TabPanelProps } from "@/types/tabPanelProps";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import CadastroProduto from "@/components/forms/CadastroProduto";

import CraicaoListaPreco from "@/components/forms/precificando";
import DescricaoForm from "@/components/forms/DescricaoForm";
import { useFormContext } from "@/config/FormContext";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Estoque from "@/components/forms/Estoque";
import { showToast } from "@/components/common/AlertToast";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid'; // Importa o UUID
import { Console } from "console";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{
        backgroundColor: '#FFFF'
      }}
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
  const [isValid, setIsValid] = useState(false);
  const [tab, setTab] = useState(0);
  const { formValues, setFormValues } = useFormContext();
  const [dataAtualizada, setDataAtualizada] = useState<string | null>(null);
  const { id , mode } = router.query; // Recuperando o id da URL

  React.useEffect(() => {
    if (mode === 'edit' && id) {
      setIsValid(false);
    } else if (mode === 'view' && id) {
      setIsValid(true);
    }
  }, [mode, id]);
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

  // // Verifica se todos os campos obrigatórios estão preenchidos
  // const isFormValid = camposObrigatorios.every(
  //   (campo) => newProduct[campo]?.toString().trim() !== ''
  // );

  const handleGenerateDescription = () => {
    const { titulo, marca, modelo, altura, largura, profundidade, pesoLiquido } = newProduct;
    const descricao = `Produto: ${titulo},\n Marca: ${marca},\n Modelo: ${modelo},\n Dimensões: ${altura}x${largura}x${profundidade} cm,\n Peso Líquido: ${pesoLiquido} g.\n`;
    setNewProduct((prev) => ({ ...prev, descricao }));
    setFormValues("produtoDescricao", { descricao })
  };

  const saveProduct = () => {
    const CadastroProdutos = formValues.CadastroProdutos;
    const infoProdutos = formValues.produto;
    const estoque = formValues.estoque;
    const produtoDescricao = formValues.produtoDescricao;
    const id = formValues?.id || uuidv4();
    const dataCriacao = moment();

    const CriaçaoProduto = {
      id,
      CadastroProdutos,
      infoProdutos,
      produtoDescricao,
      estoque,
      dataCriacao: dataCriacao.format('YYYY-MM-DD HH:mm:ss'),  // formatação da data
    };

    // Recupera os produtos cadastrados ou um array vazio, caso não exista nenhum
    const produtosCadastrados = JSON.parse(localStorage.getItem('ProdutosCadastrados')) || [];

    // Adiciona o novo produto ao array
    produtosCadastrados.push(CriaçaoProduto);

    // Salva o array de volta no localStorage
    localStorage.setItem('ProdutosCadastrados', JSON.stringify(produtosCadastrados));



    showToast({
      title: "Produto salvo com sucesso!",
      status: "success",
      position: "bottom-left",
    });
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
  const handleDelete = () => {
    const storedData = localStorage.getItem("ProdutosCadastrados");
    const storedDataAnuncios = localStorage.getItem("anuncios");
    const parsedData: { id: string;[key: string]: any }[] = JSON.parse(storedData);
    const parsedDataAnuncios: { id: string;[key: string]: any }[] = JSON.parse(storedDataAnuncios);
    // 3. Filtra os itens removendo o que tem o ID específico
    const objetoEncontrado = parsedData.filter(item => item.id == id);
  
    
    const skusProdutos = parsedDataAnuncios.flatMap(item =>
      item.produto.map((p: any) => p.sku) // Obtém os SKUs dentro de `produto`
    );
    // 2. Verifica se algum SKU de `infoProdutos.sku` já existe em `skusProdutos`
    const skuJaExiste = objetoEncontrado.some(item =>
      skusProdutos.includes(item.infoProdutos.sku) // Verifica se já existe
    );
 
    if (skuJaExiste) {
      console.error("Erro: SKU já cadastrado!");
      showToast({
        title: "Anuncio vinculado a um SKU",
        status: "error",
        position: "bottom-left",
      });
      return { success: false, message: "Anuncio vinculado a um SKU" };
    } else {
      const updatedData = parsedData.filter(item => item.id !== id);
      showToast({
        title: "Produto Deletado com sucesso!",
        status: "success",
        position: "bottom-left",
      });
          // ⏳ Adicionando um delay antes de redirecionar e atualizar o localStorage
    setTimeout(() => {
      localStorage.setItem("ProdutosCadastrados", JSON.stringify(updatedData));
      router.push('/estoque');
    }, 1000); // 3 segundos de dela
     
    }
  };
  const saveOrUpdateItem = () => {
    // Extrai os dados do formulário
    const CadastroProdutos = formValues.CadastroProdutos;
    const infoProdutos = formValues.produto;
    const estoque = formValues.estoque;
    const produtoDescricao = formValues.produtoDescricao;
    const dataCriacao = moment();
  
    // Objeto do produto atualizado ou novo
    const novoProduto = {
      id,
      CadastroProdutos,
      infoProdutos,
      produtoDescricao,
      estoque,
      dataCriacao: dataCriacao.format("YYYY-MM-DD HH:mm:ss"), // Formatação da data
    };
  
    // Obtém os dados existentes no localStorage
    const storedData = localStorage.getItem("ProdutosCadastrados");
    const parsedData: { id: string; [key: string]: any }[] = storedData ? JSON.parse(storedData) : [];
  
    // Verifica se já existe um item com o mesmo ID
    const index = parsedData.findIndex(item => item.id === id);
  
    if (index !== -1) {
      // Se o item já existe, atualiza apenas os dados dele
      parsedData[index] = { ...parsedData[index], ...novoProduto };
    } else {
      // Se não existir, adiciona o novo item
      parsedData.push(novoProduto);
    }
  
    // Salva os dados atualizados no localStorage
    localStorage.setItem("ProdutosCadastrados", JSON.stringify(parsedData));
  
    console.log("LocalStorage atualizado:", parsedData);
    
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues('CadastroProdutos', { [name]: value }); // Atualiza valores dinamicamente
  };


  React.useEffect(() => {
    const produtoSalvo = localStorage.getItem('ProdutosCadastrados');

    if (produtoSalvo) {
      const produtos = JSON.parse(produtoSalvo);

      const produtoEncontrado = produtos.find(produto => produto.id === id);

      if (produtoEncontrado) {
        const tituloAtual = formValues?.CadastroProdutos?.titulo || '';

        // Evita atualizar se o valor já estiver correto
        if (tituloAtual !== produtoEncontrado.CadastroProdutos.titulo) {
          setFormValues("CadastroProdutos", {
            titulo: produtoEncontrado.CadastroProdutos.titulo,
          });
          setFormValues("produtoDescricao", {
            descricao: produtoEncontrado?.produtoDescricao?.descricao,
          });
          setFormValues("estoque", {
            crossdocking: produtoEncontrado.estoque?.crossdocking,
            estoqueCd: produtoEncontrado.estoque?.estoqueCd,
            estoqueCdMax: produtoEncontrado.estoque?.estoqueCdMax,
            estoqueCdMin: produtoEncontrado.estoque?.estoqueCdMin,
            estoqueLocal: produtoEncontrado.estoque?.estoqueLocal,
            estoqueMaximo: produtoEncontrado.estoque?.estoqueMaximo,
            estoqueMinimo: produtoEncontrado.estoque?.estoqueMinimo,
            localizao: produtoEncontrado.estoque?.localizao,
          });
          const setProdutos = produtoEncontrado.infoProdutos
          setFormValues("produto", {
            altura: setProdutos?.altura,
            condicao: setProdutos?.condicao,
            ean: setProdutos?.ean,
            itensPorCaixa: setProdutos?.itensPorCaixa,
            largura: setProdutos?.largura,
            marca: setProdutos?.marca,
            pesoBruto: setProdutos?.pesoBruto,
            pesoLiquido: setProdutos?.pesoLiquido,
            producao: setProdutos?.producao,
            profundidade: setProdutos?.profundidade,
            unidade: setProdutos?.unidade,
            sku: produtoEncontrado?.infoProdutos?.sku
          });
        }
       
      }
      if (produtoEncontrado?.dataCriacao) {
        setDataAtualizada(produtoEncontrado.dataCriacao);
      }
    }
  }, [id, formValues, setFormValues]); // A




  return (
    <>
      <Head>
        <title>Hubeefive - Criar produto</title>
      </Head>

      <Grid container justifyContent="flex-end" alignItems="center" spacing={2} padding={2} sx={{ mb: 4 }}>
        <Grid item>
          <Button variant="contained" color="primary" id='estoque-header' onClick={() => {
                      const productId = uuidv4(); // Gerando o UUID
                      router.push(`/estoque/${productId}?mode=create`); // Passando o id na URL
                    }}>
            Cadastro de Produto Individual
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" component="label" color="primary">
            Cadastro de Produto Em Massa
            <Input type="file" sx={{ display: "none" }} />
          </Button>
        </Grid>
        {/* <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={selectedIds.length === 0}
            onClick={exportToCSV}
          >
            Exportar Produtos
          </Button>
        </Grid> */}
      </Grid>


      <Tabs value={tab} onChange={handleTabChange} aria-label="product tabs"
        sx={{
          '.MuiTabs-indicator': { display: 'none' },
          '.MuiTab-root': {
            backgroundColor: '#EEEEEE',
            color: '#9E9E9E',
            borderRadius: '10px 10px 0 0',
            m: '0 3px',

          },
          '.Mui-selected': {
            backgroundColor: '#FFFFFF',
            color: '#000000f9',
            fontWeight: 'bold',
            borderRadius: '10px 10px 0 0',

          },
          paddingLeft: '20px'
        }}
      >
        <Tab label="Ficha do Produto" id="tab-0" aria-controls="tabpanel-0" />
        <Tab label="Estoque" id="tab-1" aria-controls="tabpanel-1" />
        <Tab label="Tributação" id="tab-2" aria-controls="tabpanel-2" disabled />
      </Tabs>

      {/* Ficha tecnina com produto  */}
      <TabPanel value={tab} index={0}>
        {/* Imagens upload  */}
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Grid container padding={3} spacing={2}>
              <Grid xs={9}>
                <TextField
                  variant="standard"
                  label="Titulo"
                  name='titulo'
                  value={formValues.CadastroProdutos?.titulo || ''}
                  onChange={handleInputChange}
                  disabled={isValid}
                  fullWidth
                />
              </Grid>

              <Grid xs={3} display={'flex'} justifyContent={'flex-end'}>
                <Button id="produtos-criar" variant="contained" color="primary" disabled={isValid} onClick={saveOrUpdateItem} sx={{
                  m: 1
                }}>
                  Salvar Produto
                </Button>
                <Button variant="contained" color="primary" id="Editor" sx={{
                  m: 1
                }}
                onClick={() => router.push(`/estoque/${id}?mode=edit`)} // Define isValid para false para liberar a edição

                >
                  <ModeEditOutlineOutlinedIcon />
                </Button>
                <Button variant="contained" color="primary" disabled
                  sx={{
                    m: 1
                  }}
                >
                  <ContentCopyIcon />
                </Button>
                <Button variant="contained" color="primary"
                  sx={{
                    m: 1
                  }}
                  onClick={handleDelete}
                  id="delelete"
                // onClick={() =>
                //   handleOpenModal("Deletar", product)
                // }

                >
                  <DeleteOutlineOutlinedIcon />
                </Button>

              </Grid>

              <Typography> Última alteração em: {dataAtualizada ? moment(dataAtualizada).format('DD/MM/YYYY [às] HH:mm') : 'Nunca alterado'} </Typography>
              <Chip color="error" label="Estoque   Baixo" sx={{ borderRadius: '5px', ml: 1 }} variant="filled" size="small" />


            </Grid>

          </Grid>
          <Grid xs={2} textAlign={'center'}>
             <Image width={200} height={200} src={'/defaultImage.png'} alt={"image default"} />
            {/* Carrossel de pré-visualização */}
            {/* {newProduct.imagens.length > 0 && (
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
                          width={500}
                          height={500}
                        // style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
            )} */}
            {/* Modal para exibir a imagem em tamanho grande */}
            {/* <Modal open={!!selectedImage} onClose={handleCloseModal}>
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
            </Modal> */}
            {/* <Grid item >

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
            </Grid> */}
          </Grid >
          {/* Informações do produto  */}

          <Grid xs={10}  >
            <CadastroProduto view={isValid} />
          </Grid>
          <Grid xs={12} mb={2}>
            <Accordion defaultExpanded>
              <AccordionSummary
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography variant="h5" component={'h2'} color={'primary'} display={'flex'} fontWeight="bold" alignItems={'center'}>Lista de preços <ArrowDropDownIcon color="primary" /> </Typography>
              </AccordionSummary>

              <AccordionDetails>


                <CraicaoListaPreco view={false} />
              </AccordionDetails>
            </Accordion>

          </Grid>
          <Grid xs={12}  >
            <Accordion defaultExpanded>
              <AccordionSummary
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography variant="h5" component={'h2'} color={'primary'} display={'flex'} fontWeight="bold" alignItems={'center'}>Descrição <ArrowDropDownIcon color="primary" /> </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Box display={'flex'} justifyContent={'space-between'} p={1}>
                  <Typography variant="body1" component={'p'}>Principal descrição do produto</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenerateDescription}
                  >
                    Gerar Descrição
                  </Button>
                </Box>

                <DescricaoForm view={isValid} />
              </AccordionDetails>
            </Accordion>

          </Grid>
        </Grid>



      </TabPanel>
      {/*controle de  Estoque produto  */}
      <TabPanel value={tab} index={1} >

        <Grid container spacing={2}>
          <Grid container padding={3} spacing={2}>
            <Grid xs={9}>
              <TextField
                variant="standard"
                label="Titulo"
                name='titulo'
                value={formValues.CadastroProdutos?.titulo || ''}
                type="text"
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

            <Grid xs={3} display={'flex'} justifyContent={'flex-end'}>
              <Button id="produtos-criar" variant="contained" color="primary" onClick={saveProduct} sx={{
                m: 1
              }}>
                Salvar Produto
              </Button>
              <Button variant="contained" color="primary" id="Editor" sx={{
                m: 1
              }}
              // onClick={() => handleOpenModal("Editor", product)}
              >
                <ModeEditOutlineOutlinedIcon />
              </Button>
              <Button variant="contained" color="primary" disabled
                sx={{
                  m: 1
                }}
              >
                <ContentCopyIcon />
              </Button>
              <Button variant="contained" color="primary"
                sx={{
                  m: 1
                }}
                id="delelete"
              // onClick={() =>
              //   handleOpenModal("Deletar", product)
              // }

              >
                <DeleteOutlineOutlinedIcon />
              </Button>

            </Grid>

            <Typography> Última alteração em: {dataAtualizada ? moment(dataAtualizada).format('DD/MM/YYYY [às] HH:mm') : 'Nunca alterado'} </Typography>
            <Chip color="error" label="Estoque   Baixo" sx={{ borderRadius: '5px', ml: 1 }} variant="filled" size="small" />


          </Grid>
          <Grid xs={2}>
            {/* Carrossel de pré-visualização */}
              <Image width={200} height={200} src={'/defaultImage.png'} alt={"image default"} />
            {/* {newProduct.imagens.length > 0 && (
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
                          width={500}
                          height={500}
                        // style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
            )} */}
            {/* Modal para exibir a imagem em tamanho grande */}
            {/* <Modal open={!!selectedImage} onClose={handleCloseModal}>
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
            <Grid item >

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
            </Grid> */}
          </Grid >
          <Grid xs={10}>
            <Estoque view={isValid} />
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
