const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('sample-history-notes.pdf'));

const pages = [
  {
    title: "Page 1: The French Revolution - Causes",
    content: "The French Revolution (1789-1799) was caused by a multitude of factors. Economically, France was bankrupt due to its involvement in the American Revolution and extravagant spending by King Louis XVI and Marie Antoinette. Socially, the rigid class structure known as the Estates System marginalized the Third Estate (commoners), who bore the brunt of taxation. Politically, Enlightenment ideas of liberty, equality, and fraternity inspired the masses to demand representation and an end to absolute monarchy. A poor harvest in 1788 led to widespread bread shortages, igniting immediate civil unrest."
  },
  {
    title: "Page 2: The French Revolution - Key Events",
    content: "The Revolution began in earnest on July 14, 1789, with the Storming of the Bastille, a medieval fortress and prison in Paris symbolizing royal tyranny. The National Assembly, formed by the Third Estate, drafted the Declaration of the Rights of Man and of the Citizen in August 1789. In 1793, King Louis XVI was executed by guillotine for treason. This led to the Reign of Terror (1793-1794), led by Maximilien Robespierre and the Committee of Public Safety, where thousands of 'enemies of the revolution' were executed."
  },
  {
    title: "Page 3: The Industrial Revolution - Origins",
    content: "The Industrial Revolution began in Great Britain in the late 18th century (around 1760). Great Britain was uniquely positioned for industrialization due to its abundant reserves of coal and iron, a stable political environment, and a vast colonial empire that provided raw materials and new markets. The Agricultural Revolution preceded it, increasing food production and leading to a population boom. This created a surplus labor force that migrated from rural areas to cities in search of factory work."
  },
  {
    title: "Page 4: The Industrial Revolution - Technological Innovations",
    content: "Key innovations revolutionized the textile industry. James Hargreaves invented the Spinning Jenny in 1764, allowing workers to spin multiple threads simultaneously. Edmund Cartwright's power loom mechanized weaving. The most crucial development was James Watt's improvement of the steam engine in 1776, which provided a reliable power source independent of water, allowing factories to be built anywhere. Transportation was transformed by steam-powered locomotives and ships, dramatically reducing travel time and shipping costs."
  },
  {
    title: "Page 5: World War I - Causes",
    content: "World War I (1914-1918) was ignited by the assassination of Archduke Franz Ferdinand of Austria-Hungary on June 28, 1914, by Gavrilo Princip, a Serbian nationalist. However, the underlying causes are often remembered by the acronym MAIN: Militarism (the arms race between European powers), Alliances (complex treaties like the Triple Entente and Triple Alliance), Imperialism (competition for colonies, particularly in Africa), and Nationalism (extreme patriotic fervor, especially in the Balkans)."
  },
  {
    title: "Page 6: World War I - Major Battles and Outcomes",
    content: "WWI was characterized by brutal trench warfare, particularly on the Western Front. Major engagements included the Battle of the Somme and the Battle of Verdun in 1916, resulting in millions of casualties with minimal territorial gain. The introduction of new technologies like machine guns, poison gas, and tanks made the conflict exceptionally deadly. The war ended with the armistice on November 11, 1918. The Treaty of Versailles (1919) severely punished Germany, imposing massive reparations and territorial losses."
  },
  {
    title: "Page 7: The Cold War - Ideological Divide",
    content: "The Cold War (1947-1991) was a prolonged period of geopolitical tension between the United States and the Soviet Union. The fundamental divide was ideological: the US promoted capitalism and liberal democracy, while the USSR championed communism and state control. Europe was divided by the 'Iron Curtain'. The US adopted a policy of 'Containment', aiming to prevent the spread of communism, highlighted by the Truman Doctrine and the Marshall Plan, which provided economic aid to rebuild Western Europe."
  },
  {
    title: "Page 8: The Cold War - Proxy Wars and Crises",
    content: "Although the US and USSR never engaged in direct military conflict (hence 'Cold' War), they fought numerous proxy wars. The Korean War (1950-1953) ended in a stalemate, dividing the peninsula at the 38th parallel. The Vietnam War (1955-1975) resulted in a communist victory. The closest the world came to nuclear war was the Cuban Missile Crisis in 1962, when the US discovered Soviet nuclear missiles in Cuba, leading to a tense 13-day standoff that ended with a diplomatic resolution."
  },
  {
    title: "Page 9: The Space Race",
    content: "A significant component of the Cold War was the Space Race, a competition for supremacy in space exploration. The Soviet Union achieved early victories by launching Sputnik 1 (the first artificial satellite) in 1957 and putting the first human, Yuri Gagarin, into space in 1961. The United States responded with the Apollo program. The pinnacle of the Space Race was achieved when American astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the moon during the Apollo 11 mission on July 20, 1969."
  },
  {
    title: "Page 10: The Fall of the Soviet Union",
    content: "The Cold War concluded with the collapse of the Soviet Union in 1991. Internal economic stagnation and the costly arms race strained the Soviet economy. Mikhail Gorbachev's policies of Glasnost (political openness) and Perestroika (economic restructuring) inadvertently accelerated the collapse by allowing dissent and weakening state control. In 1989, the Berlin Wall fell, symbolizing the end of the Iron Curtain. By December 1991, the USSR was officially dissolved into 15 independent republics, leaving the US as the world's sole superpower."
  }
];

pages.forEach((pageData, index) => {
  if (index > 0) doc.addPage();
  
  doc.fontSize(24).text(pageData.title, { underline: true });
  doc.moveDown();
  doc.fontSize(14).text(pageData.content, {
    align: 'justify',
    lineGap: 5
  });
});

doc.end();

console.log("sample-history-notes.pdf generated successfully!");
