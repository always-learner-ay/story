const FOLKTALES = {
    sunmoon: {
        title: "햇님 달님",
        video: "https://www.youtube.com/watch?v=cFnUQZpriwU",
        commentPrompt: "오누이에게 하고 싶은 말을 남겨주세요",
        content: `
@prefix ex: <http://example.org/folktale/> .
@prefix schema: <https://schema.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

ex:SunAndMoon rdf:type schema:CreativeWork ;
    schema:name "햇님 달님" ;
    ex:character ex:Mother, ex:Brother, ex:Sister, ex:Tiger ;
    ex:event [
        ex:step1 "호랑이가 고개를 넘던 어머니를 잡아먹음" ;
        ex:step2 "호랑이가 어머니로 변장하여 오누이를 찾아옴" ;
        ex:step3 "오누이가 지혜를 발휘하여 나무 위로 도망침" ;
        ex:step4 "오누이는 새 동아줄을 타고 하늘로 올라가 해와 달이 됨" ;
        ex:step5 "썩은 동아줄을 탄 호랑이는 수수밭으로 떨어짐"
    ] ;
    ex:lesson "권선징악: 악한 자는 벌을 받고, 위기 상황에서 지혜를 발휘하면 구원을 얻는다." .

ex:Mother rdfs:label "어머니" .
ex:Brother rdfs:label "오빠(달님)" .
ex:Sister rdfs:label "여동생(햇님)" .
ex:Tiger rdfs:label "호랑이" ; rdf:type ex:Villain .
        `
    },
    kong: {
        title: "콩쥐 팥쥐",
        video: "https://www.youtube.com/watch?v=3lnCe-c9cOs",
        commentPrompt: "콩쥐에게 하고 싶은 말을 남겨주세요",
        content: `
@prefix ex: <http://example.org/folktale/> .
@prefix schema: <https://schema.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

ex:KongjwiPatjwi rdf:type schema:CreativeWork ;
    schema:name "콩쥐 팥쥐" ;
    ex:character ex:Kongjwi, ex:Patjwi, ex:Stepmother, ex:Helpers, ex:Governor ;
    ex:event [
        ex:step1 "새어머니와 팥쥐가 콩쥐에게 감당하기 힘든 집안일을 시킴" ;
        ex:step2 "두꺼비, 소, 새 등 동물 조력자들이 나타나 일을 도와줌" ;
        ex:step3 "선녀의 도움으로 옷을 갖춰 입고 잔치에 가다 신발을 잃어버림" ;
        ex:step4 "신발의 주인임을 확인한 감사(사또)와 콩쥐가 결혼함"
    ] ;
    ex:lesson "권선징악: 착한 마음씨를 가진 사람은 결국 복을 받고, 남을 괴롭히는 사람은 벌을 받는다." .

ex:Kongjwi rdfs:label "콩쥐 (주인공)" .
ex:Patjwi rdfs:label "팥쥐 (악역)" .
ex:Stepmother rdfs:label "새어머니" .
ex:Helpers rdfs:label "동물 조력자 및 선녀" .
ex:Governor rdfs:label "감사(사또)" .
        `
    },
    heungbu: {
        title: "흥부와 놀부",
        video: "https://www.youtube.com/watch?v=llUu8W0563o",
        commentPrompt: "흥부에게 하고 싶은 말을 남겨주세요",
        content: `
@prefix ex: <http://example.org/folktale/> .
@prefix schema: <https://schema.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

ex:HeungbuNolbu rdf:type schema:CreativeWork ;
    schema:name "흥부와 놀부" ;
    schema:genre "한국 전래 동화" ;
    ex:character ex:Heungbu, ex:Nolbu, ex:HeungbuWife, ex:Swallow ;
    ex:event [
        ex:step1 "욕심 많은 형 놀부가 착한 동생 흥부를 집에서 쫓아냄" ;
        ex:step2 "흥부가 다리가 부러진 제비를 정성껏 치료해 줌" ;
        ex:step3 "제비가 가져다준 박씨를 심어 흥부는 보물을 얻고 부자가 됨" ;
        ex:step4 "소문을 들은 놀부가 일부러 제비 다리를 부러뜨리고 박씨를 심음" ;
        ex:step5 "놀부의 박에서는 도깨비와 오물이 나와 벌을 받고 망함" ;
        ex:step6 "흥부가 형 놀부를 용서하고 함께 화목하게 삶"
    ] ;
    ex:lesson "권선징악과 형제애: 착한 일을 하면 복을 받고, 욕심을 부리면 벌을 받으며 형제간에 우애가 깊어야 한다." .

ex:Heungbu rdfs:label "흥부 (착한 동생)" .
ex:Nolbu rdfs:label "놀부 (욕심 많은 형)" .
ex:HeungbuWife rdfs:label "흥부 아내" .
ex:Swallow rdfs:label "제비 (보은의 상징)" .
        `
    }
};

// Global State
let currentStory = null;
let network = null;

document.addEventListener('DOMContentLoaded', () => {
    initChat();
    initNavigation();
});

// Navigation Logic
function initNavigation() {
    const homeScreen = document.getElementById('home-screen');
    const storyScreen = document.getElementById('story-screen');
    
    // Icon Clicks
    document.getElementById('icon-sun').addEventListener('click', () => loadStory('sunmoon'));
    document.getElementById('icon-girl').addEventListener('click', () => loadStory('kong'));
    document.getElementById('icon-swallow').addEventListener('click', () => loadStory('heungbu'));

    // Home Button
    document.getElementById('back-home').addEventListener('click', () => {
        storyScreen.style.display = 'none';
        homeScreen.style.display = 'flex';
        currentStory = null;
        if(network) {
            network.destroy();
            network = null;
        }
    });

    // Comment Submit
    document.getElementById('submit-comment').addEventListener('click', submitComment);
    document.getElementById('comment-text').addEventListener('keypress', (e) => {
        if(e.key === 'Enter') submitComment();
    });
}

function loadStory(key) {
    currentStory = key;
    const data = FOLKTALES[key];
    
    // UI Updates
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('story-screen').style.display = 'flex';
    document.getElementById('story-title').innerText = data.title;
    document.getElementById('video-link').href = data.video;
    document.getElementById('comment-header').innerText = data.commentPrompt;

    // Load Comments
    loadComments(key);

    // Parse and Render Graph
    const graphData = parseTTL(data.content);
    renderGraph(graphData);
}

// Chatbot Logic
function initChat() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');

    function send() {
        const text = input.value.trim();
        if(!text) return;
        addMessage(text, 'user');
        input.value = '';
        setTimeout(() => botReply(text), 500);
    }

    sendBtn.addEventListener('click', send);
    input.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') send();
    });

    addMessage("안녕! 나는 전래동화 챗봇이야. 궁금한게 있니?", 'bot');
}

function addMessage(text, sender) {
    const win = document.getElementById('chat-window');
    const el = document.createElement('div');
    el.className = `message ${sender}-msg`;
    el.innerText = text;
    win.appendChild(el);
    win.scrollTop = win.scrollHeight;
}

function botReply(text) {
    let reply = "재미있는 전래동화 이야기네요!";
    if(text.includes('햇님') || text.includes('달님')) {
        reply = "햇님 달님 이야기는 호랑이에게 쫓기는 오누이가 하늘로 올라가 해와 달이 되는 이야기야.";
    } else if(text.includes('콩쥐') || text.includes('팥쥐')) {
        reply = "콩쥐 팥쥐는 착한 콩쥐가 동물 친구들의 도움으로 행복을 찾는 이야기란다.";
    } else if(text.includes('흥부') || text.includes('제비')) {
        reply = "제비가 가져다 준 박씨로 부자가 된 흥부 이야기, 정말 신나지 않니?";
    } else if(text.includes('안녕')) {
        reply = "안녕! 우리 같이 동화 여행을 떠나볼까?";
    }
    addMessage(reply, 'bot');
}

// Comment Logic
function loadComments(key) {
    const list = document.getElementById('comments-list');
    list.innerHTML = '';
    const stored = JSON.parse(localStorage.getItem('comments_' + key) || '[]');
    stored.forEach(c => {
        const div = document.createElement('div');
        div.className = 'comment-item';
        div.innerText = c;
        list.appendChild(div);
    });
}

function submitComment() {
    const input = document.getElementById('comment-text');
    const text = input.value.trim();
    if(!text || !currentStory) return;

    const key = 'comments_' + currentStory;
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    stored.push(text);
    localStorage.setItem(key, JSON.stringify(stored));

    const list = document.getElementById('comments-list');
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerText = text;
    list.appendChild(div);

    input.value = '';
}

// TTL Parser (Simple)
function parseTTL(ttl) {
    const nodes = new Set();
    const edges = [];
    const idMap = {}; // label or URI to simplified ID

    const lines = ttl.split('\n');
    let parentNode = null;

    lines.forEach(line => {
        line = line.trim();
        if(!line || line.startsWith('#') || line.startsWith('@')) return;

        // Basic clean
        line = line.replace(/;/g, '').replace(/\./g, '').replace(/,/g, '');
        
        // Simple logic to extract Terms
        // Looking for patterns like: ex:Subject predicate object
        
        // Split by spaces, but respect quotes
        const parts = line.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
        if(parts.length < 2) return;

        // Simplify prefixes
        const clean = (s) => s.replace(/^ex:/, '').replace(/^schema:/, '').replace(/^rdf:/, '').replace(/^rdfs:/, '').replace(/"/g, '');

        let subj = clean(parts[0]);
        
        // Handle predicates and objects very simply for viz
        // If it starts with a predicate (indentation usually implies subject is previous one), but here we parse simple triples
        
        // Very rough "Main Subject" detection
        if(parts[0].includes(':') && !parts[0].startsWith('"')) {
             // It's likely a triple start or continuation
             parentNode = subj;
             nodes.add(subj);
        }

        // Check for Predicate Object structure
        // This is a naive parser for the visualizer.
        // We iterate line by line.
        // If 3 parts: Subj Pred Obj
        // If 2 parts: Pred Obj (implies parentNode is Subj)
        
        if (parts.length >= 3) {
            let p = clean(parts[1]);
            let o = clean(parts.slice(2).join(' ')); // Object might be long string
            
            // Check if parts[0] is a subject (has colon)
            if (parts[0].includes(':')) {
                subj = clean(parts[0]);
                parentNode = subj;
                nodes.add(subj);
                
                // Add Object node if not literal or make literal node
                nodes.add(o);
                edges.push({ from: subj, to: o, label: p });
            }
        } else if (parts.length >= 2 && parentNode) {
            // Continuation
            let p = clean(parts[0]);
            let o = clean(parts.slice(1).join(' '));
            nodes.add(o);
            edges.push({ from: parentNode, to: o, label: p });
        }
    });

    // Convert Set strings to Array of Objects
    const nodeArray = Array.from(nodes).map(id => ({ 
        id: id, 
        label: id.length > 20 ? id.substring(0, 20) + '...' : id,
        title: id, // Tooltip
        shape: 'box',
        color: { background: '#fff', border: '#FFD700' }
    }));

    return { nodes: nodeArray, edges: edges };
}

// Graph Render (Vis.js)
function renderGraph(data) {
    const container = document.getElementById('graph-container');
    const visData = {
        nodes: new vis.DataSet(data.nodes),
        edges: new vis.DataSet(data.edges)
    };
    const options = {
        nodes: {
            font: { face: 'Gaegu', size: 16 },
            borderWidth: 2,
            shadow: true
        },
        edges: {
            arrows: 'to',
            font: { align: 'middle', face: 'Gaegu' },
            color: '#ccc',
            smooth: true
        },
        physics: {
            stabilization: false,
            barnesHut: {
                springLength: 200
            }
        }
    };
    network = new vis.Network(container, visData, options);
}
