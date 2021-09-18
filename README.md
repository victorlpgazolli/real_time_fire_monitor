# Projeto de internet das coisas de baixo custo para monitoramento de incêndios em áreas sensíveis


##  Indice:
- Documentos
  - [Escopo do projeto](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/docs/RDE.pdf)
  - [Requisitos Técnicos](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/docs/LRT.pdf)
  - [Análise de Viabilidade](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/docs/RAV.pdf)
  - [Cronograma dos entregáveis](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/docs/schedule.pdf)
  - [Especificação técnica do
  dispositivo](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/docs/DTE/DTE_device.pdf)
  - [Especificação técnica do dashboard
  web](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/docs/DTE/DTE_web.pdf)
  - [Diagrama dos componentes](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/docs/diagram.png)
  - [Circuito](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/src/hardware/circuit.jpeg)
- Código fonte do projeto
  - [Backend](https://github.com/victorlpgazolli/real_time_fire_monitor/tree/master/src/backend)
  - [Frontend](https://github.com/victorlpgazolli/real_time_fire_monitor/tree/master/src/frontend)
  - [Firmware](https://github.com/victorlpgazolli/real_time_fire_monitor/tree/master/src/firmware)
- [Resumo](#resumo)
- [Introdução](#introdução)
- [Objetivos](#objetivos)
- [Metodologia](#metodologia)
  - [Microcontrolador](#microcontrolador)
  - [Sensor MQ 135](#sensor-mq-135)
  - [Sensor DHT 11](#sensor-DHT-11)
  - [Módulo Lora Wan](#modulo-lora-wan)
  - [PCB](#pcb)
  - [PLACA SOLAR](#placa-solar)
- [Desenvolvimento](#desenvolvimento)
  - [Aplicação web](#aplicação-web)
  - [Aplicação backend](#aplicação-backend)
  - [Encapsulamento e placa de circuito impresso](#encapsulamento-e-placa-de-circuito-impresso)
  - [Coleta e análise de dados](#coleta-e-análise-de-dados)
- [Resultados](#resultados)
  - [Testes](#testes)
- [Considerações Finais](#considerações-finais)
- [Rerefências Bibliográficas](#referências-bibliográficas)
- Integrantes
  - Felipe Santos Bardella
  - Victor Leonardo Pasqualini Gazolli
  - Vinicius Zancanari de Santana

## **RESUMO**

Com o grande número de queimadas que ocorreram no ano de 2020 no Brasil, surgiu uma preocupação ainda maior com a prevenção das mesmas, que impactaram de grande forma pessoas que viviam em regiões próximas às afetadas.

Com isso, foi criado o Dispositivo de Queimadas que ajuda na prevenção contra queimadas informando o risco de fogo observado por meio de uma aplicação web.

## **INTRODUÇÃO**

A importância da conscientização sobre incêndios naturais mostrou-se relevante nos últimos anos pela sua relação com a degradação da Caatinga, sendo um ecossistema próprio do clima semiárido (ALVARES et al., 2013). Antongiovanni et al. (2020) identificaram, através de fragmentos da caatinga, que devido a incêndios e ações antrópicas o ambiente sofreu danos significativos.

Mesmo contando com plantas que se ajustam ao clima seco, drenando a maior quantidade de água do solo, que pode auxiliar na contenção de incêndios, mostra-se necessária a atenção a estes devido a caatinga ser o maior bioma e mais diversificado entre as florestas tropicais sazonalmente secas, que está perdendo cada vez mais sua flora original.

A região sofre com o desmatamento, as queimadas e as secas (ALMEIDA et al., 2020) , que acarretam consequências econômicas, sociais e do bem estar da população daquele local. A complexidade dos impactos se estende (segundo a OMS, 2006).

Uma estimativa de vulnerabilidade das populações brasileiras apontou o Nordeste como uma região mais sensível a mudanças climáticas devido a baixos índices de desenvolvimento social e econômico.

Visto isso e com os conhecimentos técnicos na matéria de Fundamentos da Internet das Coisas (IoT) e Ciências de Ambiente, foi projetado um conjunto híbrido de sensores com o intuito de alertar previamente moradores de vilas e cidades dentro de zonas com Risco de Fogo Observado do Instituto Nacional de Pesquisas Espaciais (INPE; http://queimadas.dgi.inpe.br/queimadas/portal/risco-de-fogo-meteorologia). O projeto de detecção e aviso precoce de incêndios naturais expostos neste artigo representam não apenas cuidado, mas também respeito a esta região, e o povo que reside nele.

A Figura 1 mostra a área ameaçada por incêndios naturais no dia seis de março de 2021. A área afetada mostra-se no litoral do Nordeste, onde predomina o clima semiárido e vegetação da caatinga.

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/mapa.png)

Figura 1 - Risco de Fogo Observado. Foto: Inep 2021.

Considerando o exposto, o projeto conta com um site que apresenta potencial para ser utilizado pela população e autoridades responsáveis, contendo dados sobre risco de incêndio natural em tempo real. Os dados são coletados através de sensores e transmitidos via sinal de rádio de baixo consumo de energia para uma central; consequentemente, esses dados são encaminhados a um servidor que disponibiliza as informações no site.

## **OBJETIVOS**

O objetivo do presente estudo é medir parâmetros ambientais a partir de sensores com transmissão em tempo real, de forma a determinar o risco de ocorrência de incêndio. Esses dados devem ser disponibilizados em um site para que a população e autoridades responsáveis monitorem o risco e tenham ciência quando ocorre incêndios.

## **METODOLOGIA**

O sistema IoT para detecção precoce de incêndios naturais é composto por uma rede de sensores sem fio, e um sistema Web para monitoramento. Foram definidas três fases para o bom funcionamento do protótipo: medição de dados, transmissão e apresentação.

Os nós da rede são responsáveis pela captação dos parâmetros ambientais como temperatura, umidade e dióxido de carbono. A transmissão dos dados é feita após a medição, e a informação é enviada para um gateway com conexão à internet. O fluxo de dados segue um caminho único, da coleta para a transmissão, e da transmissão para o armazenamento e apresentação em um servidor Web. A arquitetura do sistema é apresentada na Figura 2: ![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/fluxo1.png)

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/fluxo2.png)

Figura 2 - Diagrama de blocos do projeto ![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/fluxo2.png)

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/fluxo3.png)

Figura 2 - Diagrama de blocos do projeto

Os parâmetros ambientais necessários para determinar se existe risco de fogo são determinados pelos seguintes componentes:

- Microcontrolador Esp8266 (Tensilica 32-bit RISC CPU Xtensa LX106)
- DHT 11 (temperatura e umidade)
- MQ 135 (dióxido de carbono)

Visando o baixo consumo de energia e a transmissão em longas distâncias, foi adotado a tecnologia LoRaWAN, que é responsável pela comunicação do dispositivo com uma estação de recepção (Gateway).

### **MICROCONTROLADOR**

O microcontrolador escolhido foi o Esp8266 (Figura 3), que tem a função de coletar os dados dos sensores de temperatura, umidade e dióxido de carbono (CO2), analisar e enviar a informação para o servidor. Ele é alimentado por uma placa de energia fotovoltaica 12V, 250mA e 3W.

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/microcontrolador.jpg)

Figura 3 - Microcontrolador Esp8266

### **SENSOR MQ 135**

O sensor MQ 135 (Figura 4) detecta o gás dióxido de carbono (CO2) que é um dos pontos de confirmação para analisar se está ocorrendo um incêndio florestal ou apenas um falso positivo.

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/sensor_co2.png)

Figura 4 - Sensor MQ 135 - Dióxido de Carbono (frente e verso)

Funcionando em uma faixa de 0 V a 5 V, o sensor trabalha em um range de 10 a 1.000 ppm (partículas por milhão), temperatura de -10 a 70ºC, consumindo uma corrente de 150 mA e podendo ser regulado por meio de parafuso philips que está ligado em um potenciômetro para ficar mais sensível.

Quando o MQ135 detecta os dados de CO2, a resistência dele abaixa e através de uma porta analógica do microcontrolador consegue-se transformar o dado em informação para análise.

### **SENSOR DHT 11**

O DHT 11 (Figura 5) é responsável por medir duas variáveis: temperatura e umidade. Este sensor trabalha no range de 3 V até 5 V, corrente de 0,5 mA até 2,5 mA, porém quando está no modo sleep (dormindo) tem um consumo entre 100 µA e 150 µA. A precisão ao aferir a temperatura é de ± 2 ºC e a umidade é de ± 5% UR.

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/DHT.jpg)

Figura 5 - Sensor DHT 11 - Temperatura e Umidade

### **MODULO LORA WAN**

Responsável pela comunicação entre dispositivo e servidor, o LoRa WAN (Figura 6) tem o propósito de transmitir dados de maneira eficiente utilizando pouca energia.

O módulo LoRaWan trabalha com uma tensão entre 1,8 V até 4 V, com um consumo de corrente para transmissão de 110 mA e para receptação de 20 mA, a taxa de dados tem um range de 180 bps até 21900 bps. Em uma área aberta o LoRaWan tem alcance de até 15 km, porém dentro de uma floresta tem entre 1 a 3 km.

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/lora.jpg)

Figura 6 - Módulo LoRaWAN

### **PCB**

A placa de circuito impresso, PCB, está localizada dentro do encapsulamento de filamento PLA (Ácido Polilático), projetada no programa de software livre KICAD. A placa contém os componentes, sensores, antena e o microcontrolador.

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/pcb.jpg)

Figura 7 - Placa de Circuito Impresso

### **PLACA SOLAR**

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/placa_solar.jpg)

Figura 8 - Placa solar.

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/esquematico.png)

Figura 9 - Esquemático da Placa de Circuito Impresso (programa Kicad)

Após receber carga pela placa solar (carga total = 12 V), o conversor DC/DC libera 5 V para os sensores e o módulo LoRa Wan. Já o microcontrolador precisa de apenas 3,3 V. No sensor DHT11 (temperatura e umidade) há um capacitor de 100 nF e um resistor pull up para filtragem de ruídos.

### **DESENVOLVIMENTO**

### **APLICAÇÃO WEB**

A aplicação WEB (desenvolvido em React JS) é o meio em que os usuários da aplicação podem ver qual o risco de fogo observado em diferentes regiões do país, desde que hajam dispositivos instalados nelas.

O mapa do Brasil com pontos em todos sensores instalados estão apresentados na Figura 7, mostrando em qual cidade está localizado ao passar o cursor por cima. Abaixo estão os cards que mostram todas localizações e seu nível de risco de fogo observado, junto dos parâmetros de umidade, temperatura e dióxido de carbono.

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/dashboard.png)

Figura 10 - Aplicação WEB

### **APLICAÇÃO BACKEND**

Desenvolvido em NodeJS, o backend é o intermediário entre o usuário e os sensores, e nele é feito o tratamento a inserção dos dados em um banco de dados não relacional (MongoDB), e o envio da notificação para a aplicação web para que ela atualize em tempo real.

### **ENCAPSULAMENTO E PLACA DE CIRCUITO IMPRESSO**

O encapsulamento do dispositivo foi elaborado no software Fusion 360 em que o grupo possui licença de estudante (figura 12). A versão real é feita em MDF com medidas de 15x15x5cm, como a Figura 13 mostra. Os cortes são feitos utilizando uma Cortador a Laser, em que é possível realizá-los com uma precisão milimétrica.

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/3d_encapsulamento1.png)

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/3d_encapsulamento2.png)

Figura 12 - Encapsulamento no software Fusion 360

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/encapsulamento1.jpg)

Figura 13 - Encapsulamento em MDF

A placa de circuito impresso é feita utilizando uma placa de fenolite. A mesma passa por um processo conhecido como fresagem, em que uma máquina faz as trilhas de forma precisa.

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/montagem.jpg)

Figura 14 - Placa de circuito impresso com componentes soldados

### **COLETA E ANÁLISE DE DADOS**

A coleta acontece através dos sensores, que transmite essa informação para um gateway através de comunicação de baixo consumo de energia e longa distância (LoRaWAN), e redireciona a mesma para o servidor para que seja feito o cálculo que determina o risco de fogo da região.

Existem diversas fórmulas que podem dizer o risco de fogo através dos parâmetros ambientais, porém considerando um ranking de eficiência na previsão de incêndios florestais. Segundo White e Ribeiro (2010), o Índice de Angstron (Willis et al., 2001) apresentou os resultados que mais se aplicam para o objetivo do dispositivo, comparado a outros como o Índice Logarítmico de Telicyn e o Índice de Rodríguez e Moretti.

Índice de Angstron: B = 0,05H - 0,1\*(T - 27)

onde:

B = índice de Angstron

H = umidade relativa do ar em %

T = temperatura do ar em Célsius

Quando o índice (B) for maior ou igual a 3, o risco é baixo. Quando for maior que 2,5 e menor que 3, o risco é moderado. Por último, quando o índice for menor ou igual a 2,5, indica um risco elevado.

##  **RESULTADOS**

### **Testes**

Os testes feitos foram feitos a partir dos dados que foram coletados colocando os sensores junto a uma fogueira controlada;

com a fogueira apagada verificamos os seguintes dados (Figura 16).

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/teste_pratico1.jpg)

Figura 15 -Imagem demonstra uma fogueira apagada

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/dados_teste1.png)

Figura 16 - Imagem demonstra os parâmetros coletados com a fogueira apagada

Aplicando o Índice de Angstron nesses valores é possível notar que:

Índice de Angstron = ((0.05 \* 68) - ((27.6 - 27) \* 0.1)) = 3,34

No cenário sem fogo e com os parâmetros ambientais medidos, o risco calculado de incêndio por meio do Índice de Angstron adotado foi baixo. Enquanto que, com a fogueira acesa (Figura 17), é possível verificar que as variáveis ambientais mudaram, e isso impactou diretamente o risco de fogo (Figura 18).

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/teste_pratico2.png)

Figura 17 - Imagem demonstra um protótipo perto de uma fogueira acesa

![](https://github.com/victorlpgazolli/real_time_fire_monitor/blob/master/images/dados_teste2.png)

Figura 18 - Imagem demonstra os parâmetros coletados com a fogueira acesa

Analisando o cenário com fogo, foi possível notar que:

Índice de Angstron = ((0.05 \* 22) - ((45,20 - 27) \* 0.1)) = -0.72

Pelo fato do índice ser menor que um, o risco de fogo demonstra ser muito provável.

##  **CONSIDERAÇÕES FINAIS**
Durante o desenvolvimento do projeto e no estudo sobre o tema, foi percebido que o sensor de Dióxido de Carbono era irrelevante para determinar se existia o risco de fogo a priori. Não foi encontrado nenhuma base científica que comprove o uso do CO2 para medir tal parâmetro, portanto este sensor não fará parte da primeira versão; serão necessários novos estudos e testes para avaliar se faz sentido ao projeto usufruir deste sensor.

Dentre as limitações do projeto, destaca-se que nos testes dos sensores houveram algumas dificuldades na montagem do circuito, prejudicando os resultados na primeira leva de testes, porém foi ajustado posteriormente.

Como previsto, o Índice de Angstron se demonstrou eficiente para medir os parâmetros ambientais, pois seguiu todas as tendências esperadas durante os testes.

Foi atestado que o dispositivo pode ser de grande ajuda para áreas com índice elevado de incêndios naturais recorrentes (área de risco observado). Por meio de uma malha de dispositivos, seria possível cobrir uma área extensa para que seja feito o monitoramento em tempo real desses parâmetros ambientais e garantindo que o usuário consiga acompanhar e se antecipar aos possíveis incêndios da sua região.

## **REFERÊNCIAS BIBLIOGRÁFICAS**

- ALMEIDA, Rafaela Gomes de; CAVALCANTE, Arnóbio de Mendonça Barreto; SILVA, Emerson Mariano da. Impactos das Mudanças Climáticas no Bioma Caatinga na Percepção dos Professores da Rede Pública Municipal de General Sampaio - Ceará. Rev. bras. meteorol., São Paulo , v. 35, n. 3, p. 397-405, Sept. 2020 . Available from \&lt;http://www.scielo.br/scielo.php?script=sci\_arttext&amp;pid=S0102-77862020000300397&amp;lng=en&amp;nrm=iso\&gt;. access on 07 Mar. 2021. Epub Sep 07, 2020. [https://doi.org/10.1590/0102-7786353002](https://doi.org/10.1590/0102-7786353002)

- ALVARES, Clayton Alcarde; STAPE, José Luiz; SENTELHAS, Paulo Cesar; GONÇALVES, José Leonardo de Moraes; SPAROVEK, Gerd. Köppen&#39;s climate classification map for Brazil. _ **Meteorologische Zeitschrift** _, Sttutgart, v. 22, n. 6, p. 711-728, 2013. Disponível em: \&lt; http://www.ingentaconnect.com/content/schweiz/mz/2013/00000022/00000006/art00008?token=004f1a11bab2a729bc7e41225f40382d2c2b4652767446624550576b34272c5f7b3d6d3f4e4b34a \&gt; DOI: 10.1127/0941-2948/2013/0507.

- DATASHET DHT 11,https://www.alldatasheet.com/view.jsp?Searchword=HDHT11&amp;sField=3

- Figura 1 - [http://queimadas.dgi.inpe.br/queimadas/portal/risco-de-fogo-meteorologia](http://queimadas.dgi.inpe.br/queimadas/portal/risco-de-fogo-meteorologia)

- Pruss-Ustun A, Corvalan C. Ambientes saludables y prevención de enfermedades. Ginebra: OMS; 2006.

[http://queimadas.dgi.inpe.br/queimadas/portal/risco-de-fogo-meteorologia](http://queimadas.dgi.inpe.br/queimadas/portal/risco-de-fogo-meteorologia)

- Sensor de Gás MQ-135 e a família MQ de detectores de Gás, [https://portal.vidadesilicio.com.br/sensor-de-gas-mq-135/](https://portal.vidadesilicio.com.br/sensor-de-gas-mq-135/)

- TECHNICAL DATA MQ-135 GAS SENSOR, [https://img.filipeflop.com/files/download/Sensor\_de\_gas\_MQ-135.pdf](https://img.filipeflop.com/files/download/Sensor_de_gas_MQ-135.pdf)

- WHITE, B. L. A. ; RIBEIRO, A. S. . ANÁLISE DA EFICIÊNCIA DOS ÍNDICES DE PERIGO DE OCORRÊNCIA DE INCÊNDIOS FLORESTAIS PARA O PARQUE NACIONAL SERRA DE ITABAIANA, SERGIPE.. In: SANTOS, Antônio Carlos dos; FILHO, José Daltro; SOARES, Maria José Nascimento; RANDOW, Priscila Christina Borges Dias. (Org.). Pensar a (in)sustentabilidade: desafios à pesquisa.. Porto Alegre: Redes Editora, 2010.
