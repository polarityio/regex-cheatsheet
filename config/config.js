module.exports = {
  name: 'Regex Cheat Sheet',
  acronym: 'REGEX',
  onDemandOnly: true,
  defaultColor: 'light-gray',
  customTypes: [
   // {
   //   key: 'Entity to Regex',
   //   regex: /^\w{2,32}\s?\w{0,32}\s?\w{0,32}$/
    //},
    {
      key: 'Regex',
      regex: /^.{1,32}$/
    }
  ],
  styles: ['./styles/windows.less'],
  block: {
    component: {
      file: './components/windows-block.js'
    },
    template: {
      file: './templates/windows-block.hbs'
    }
  },
  summary: {
    component: {
      file: './components/windows-summary.js'
    },
    template: {
      file: './templates/windows-summary.hbs'
    }
  },
  request: {
    cert: '',
    key: '',
    passphrase: '',
    ca: '',
    proxy: '',
    rejectUnauthorized: true
  },
  logging: {
    level: 'info' //trace, debug, info, warn, error, fatal
  },
  options: []
};
