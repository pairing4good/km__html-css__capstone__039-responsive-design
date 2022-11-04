const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the todo-column', () => {
  it('should have a todo heading with the classes todo and task-status', async () => {
    const innerHtml = await page.$eval('#todo-column > #todo-status-heading', (statusHeading) => {
      return statusHeading.innerHTML.trim();
    });
    
    expect(innerHtml).toBe('todo');

    const classList = await page.$eval('#todo-column > #todo-status-heading', (statusHeading) => {
      return statusHeading.classList;
    });

    expect(classList[0]).toContain('todo');
    expect(classList[1]).toContain('task-status');
  });
});

describe('the doing-column', () => {
  it('should have a doing heading with the classes doing and task-status', async () => {
    const innerHtml = await page.$eval('#doing-column > #doing-status-heading', (statusHeading) => {
      return statusHeading.innerHTML.trim();
    });
    
    expect(innerHtml).toBe('doing');

    const classList = await page.$eval('#doing-column > #doing-status-heading', (statusHeading) => {
      return statusHeading.classList;
    });

    expect(classList[0]).toContain('doing');
    expect(classList[1]).toContain('task-status');
  });
});

describe('the done-column', () => {
  it('should have a done heading with the classes done and task-status', async () => {
    const innerHtml = await page.$eval('#done-column > #done-status-heading', (statusHeading) => {
      return statusHeading.innerHTML.trim();
    });
    
    expect(innerHtml).toBe('done');

    const classList = await page.$eval('#done-column > #done-status-heading', (statusHeading) => {
      return statusHeading.classList;
    });

    expect(classList[0]).toContain('done');
    expect(classList[1]).toContain('task-status');
  });
});

describe('cards', () => {
  it('should no longer have an individual status', async () => {
      var cardStatuses = await page.$$('.card > .task-status');
      expect(cardStatuses.length).toBe(0);
  });
});

describe('cards', () => {
  it('should only contain a description without a containing task-description div', async () => {
      var cardStatuses = await page.$$('.card > div');
      expect(cardStatuses.length).toBe(0);
  });
});

describe('the card class', () => {
  it('should have a padding of 10px', async () => {
    const padding = await page.$eval('.card', (card) => {
      var style = window.getComputedStyle(card);
      return style.getPropertyValue('padding');
    });
      
    expect(padding).toBe('10px');
  });
});

describe('the card class', () => {
  it('should not have a set width', async () => {
    const cardWidthLength = await page.$eval('style', (style) => {
      return (style.innerHTML.match(/\.card.*{[\s\S][^}]*width.*:.*;/g) || []).length;
    });
    
    expect(cardWidthLength).toBe(0)
  });
});

describe('the column class', () => {
  it('should have a minimum width of 175px', async () => {
    const minWidth = await page.$eval('.column', (column) => {
      var style = window.getComputedStyle(column);
      return style.getPropertyValue('min-width');
    });
    
    expect(minWidth).toBe('175px');
  });
});