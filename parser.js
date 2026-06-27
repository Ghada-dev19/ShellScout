const TRANSLATIONS = {
  eng: {
    cmdBadge: 'Command',
    flagBadge: 'Flag',
    argBadge: 'Argument',
    fallbackCmd: 'Custom or user-defined command. Please check the official man page.',
    fallbackFlag: 'Custom or command-specific option flag.',
    fallbackArg: 'Argument: value or option target passed to the command.',
    targetPath: 'Target Path: directory or file destination for this operation.',
    archiveFile: 'Archive File: filename of the archive to be created or extracted.',
    multiFlagHeader: 'Option breakdown:'
  },
  ara: {
    cmdBadge: 'أمر',
    flagBadge: 'خيار',
    argBadge: 'وسيط',
    fallbackCmd: 'أمر مخصص أو غير معروف - يرجى التحقق من الدليل الرسمي (man page).',
    fallbackFlag: 'خيار مخصص أو غير معروف للأمر المحدد.',
    fallbackArg: 'وسيط: قيمة أو ملف مستهدف ممرر للأمر.',
    targetPath: 'المسار المستهدف: المجلد أو الملف الهدف لهذه العملية.',
    archiveFile: 'ملف الأرشيف: اسم ملف الأرشيف المراد التعامل معه.',
    multiFlagHeader: 'تفصيل الخيارات:'
  }
};

const DATABASE = {
  'cd': {
    desc: {
      eng: 'Change Directory: Used to navigate between system folders.',
      ara: 'تغيير الدليل: يُسْتَخدم للانتقال بين مجلدات النظام.'
    },
    flags: {}
  },
  'ls': {
    desc: {
      eng: 'List: Lists directory contents (files and folders).',
      ara: 'عرض المحتويات: يسرد الملفات والمجلدات داخل الدليل الحالي.'
    },
    flags: {
      '-l': {
        eng: 'Long listing format: shows file permissions, ownership, size, and modification date.',
        ara: 'تنسيق القائمة الطويلة: يعرض صلاحيات الملفات، والمالك، والحجم، وتاريخ التعديل.'
      },
      '-a': {
        eng: 'Show all: includes hidden files (those starting with a dot ".").',
        ara: 'عرض الكل: يشمل الملفات المخفية (التي تبدأ أسماؤها بنقطة ".").'
      },
      '-la': {
        eng: 'Combines long listing (-l) and showing hidden files (-a).',
        ara: 'يجمع بين عرض القائمة الطويلة (-l) وإظهار الملفات المخفية (-a).'
      },
      '-h': {
        eng: 'Human-readable: prints sizes in easy-to-read formats (e.g., 1K, 234M, 2G).',
        ara: 'صيغة سهلة القراءة: يعرض الأحجام بوحدات مفهومة (مثل: كيلوبايت، ميجابايت، جيجابايت).'
      }
    }
  },
  'mkdir': {
    desc: {
      eng: 'Make Directory: Creates a new folder.',
      ara: 'إنشاء مجلد: يُنشئ دليلاً جديداً في المسار المحدد.'
    },
    flags: {
      '-p': {
        eng: 'Parents: makes parent directories as needed, no error if existing.',
        ara: 'المجلد الأبوي: ينشئ المجلدات الفرعية والأبوية تلقائياً دون إظهار خطأ إذا كانت موجودة.'
      }
    }
  },
  'rm': {
    desc: {
      eng: 'Remove: Used to delete files or directories.',
      ara: 'حذف: يُستخدم لحذف الملفات أو المجلدات.'
    },
    flags: {
      '-r': {
        eng: 'Recursive: remove directories and their contents recursively.',
        ara: 'حذف متكرر: حذف المجلدات ومحتوياتها بالكامل بشكل متكرر.'
      },
      '-f': {
        eng: 'Force: ignore nonexistent files and arguments, never prompt.',
        ara: 'فرض الحذف: يتجاهل الملفات غير الموجودة ولا يطلب تأكيداً أبداً.'
      },
      '-rf': {
        eng: 'Force recursive deletion: deletes directories and all contents immediately without prompting.',
        ara: 'حذف متكرر وقسري: يحذف المجلد وجميع محتوياته فوراً دون طلب تأكيد.'
      }
    }
  },
  'pwd': {
    desc: {
      eng: 'Print Working Directory: Shows the full path of the current folder.',
      ara: 'طباعة دليل العمل الحالي: يظهر المسار الكامل للمجلد الذي تقف فيه الآن.'
    },
    flags: {}
  }
};

function parseCommand(commandStr, lang = 'eng') {
  const cleanCmd = commandStr.trim().replace(/\s+/g, ' ');
  const parts = cleanCmd.split(' ');
  if (parts.length === 0 || parts[0] === '') return { tokens: [], explanations: [] };

  const baseCmd = parts[0];
  const tokens = [];
  const explanations = [];

  // 1. Base command token
  tokens.push({ text: baseCmd, type: 'command', colorClass: 'color-cmd' });

  const cmdEntry = DATABASE[baseCmd];
  const cmdDesc = cmdEntry ? cmdEntry.desc[lang] : TRANSLATIONS[lang].fallbackCmd;
  explanations.push({ name: baseCmd, type: 'command', desc: cmdDesc, colorClass: 'color-cmd' });

  // 2. Process arguments and options
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('-')) {
      // Flag token
      tokens.push({ text: part, type: 'flag', colorClass: 'color-flag' });

      let flagDesc = '';
      if (cmdEntry) {
        if (cmdEntry.flags[part]) {
          flagDesc = cmdEntry.flags[part][lang];
        } else {
          // Decompose composite flags (e.g. -la, -rf)
          const cleanFlag = part.startsWith('--') ? [part] : part.slice(1).split('').map(c => `-${c}`);
          let items = [];
          cleanFlag.forEach(f => {
            if (cmdEntry.flags[f]) {
              items.push(`<code>${f}</code>: ${cmdEntry.flags[f][lang]}`);
            } else {
              items.push(`<code>${f}</code>: ${lang === 'ara' ? 'خيار مخصص أو غير معروف.' : 'Custom or composite option flag.'}`);
            }
          });
          flagDesc = `${TRANSLATIONS[lang].multiFlagHeader}<ul class="${lang === 'ara' ? 'mr-5' : 'ml-5'} mt-1 list-disc"><li>${items.join('</li><li>')}</li></ul>`;
        }
      } else {
        flagDesc = TRANSLATIONS[lang].fallbackFlag;
      }

      explanations.push({ name: part, type: 'flag', desc: flagDesc, colorClass: 'color-flag' });
    } else {
      // Argument token
      tokens.push({ text: part, type: 'argument', colorClass: 'color-arg' });

      let argDesc = TRANSLATIONS[lang].fallbackArg;
      if (baseCmd === 'tar' && part.includes('.tar')) {
        argDesc = TRANSLATIONS[lang].archiveFile;
      } else if (part.startsWith('/') || part.includes('/') || part === 'project/src' || part === '/home/user' || part === '/tmp/scratch') {
        argDesc = TRANSLATIONS[lang].targetPath;
      }

      explanations.push({ name: part, type: 'argument', desc: argDesc, colorClass: 'color-arg' });
    }
  }

  return { tokens, explanations };
}

// Export module for Node.js tests or assign global for browser use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { parseCommand, DATABASE, TRANSLATIONS };
} else if (typeof window !== 'undefined') {
  window.ShellScoutParser = { parseCommand, DATABASE, TRANSLATIONS };
}
