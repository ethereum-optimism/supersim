"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIGINFO = exports.SIGILL = exports.SIGHUP = exports.SIGFPE = exports.SIGCONT = exports.SIGCHLD = exports.SIGBUS = exports.SIGBREAK = exports.SIGALRM = exports.SIGABRT = exports.RTLD_NOW = exports.RTLD_LOCAL = exports.RTLD_LAZY = exports.RTLD_GLOBAL = exports.RTLD_DEEPBIND = exports.PRIORITY_NORMAL = exports.PRIORITY_LOW = exports.PRIORITY_HIGHEST = exports.PRIORITY_HIGH = exports.PRIORITY_BELOW_NORMAL = exports.PRIORITY_ABOVE_NORMAL = exports.EXDEV = exports.EWOULDBLOCK = exports.ETXTBSY = exports.ETIMEDOUT = exports.ETIME = exports.ESTALE = exports.ESRCH = exports.ESPIPE = exports.EROFS = exports.ERANGE = exports.EPROTOTYPE = exports.EPROTONOSUPPORT = exports.EPROTO = exports.EPIPE = exports.EPERM = exports.EOVERFLOW = exports.EOPNOTSUPP = exports.ENXIO = exports.ENOTTY = exports.ENOTSUP = exports.ENOTSOCK = exports.ENOTEMPTY = exports.ENOTDIR = exports.ENOTCONN = exports.ENOSYS = exports.ENOSTR = exports.ENOSR = exports.ENOSPC = exports.ENOPROTOOPT = exports.ENOMSG = exports.ENOMEM = exports.ENOLINK = exports.ENOLCK = exports.ENOEXEC = exports.ENOENT = exports.ENODEV = exports.ENODATA = exports.ENOBUFS = exports.ENFILE = exports.ENETUNREACH = exports.ENETRESET = exports.ENETDOWN = exports.ENAMETOOLONG = exports.EMULTIHOP = exports.EMSGSIZE = exports.EMLINK = exports.EMFILE = exports.ELOOP = exports.EISDIR = exports.EISCONN = exports.EIO = exports.EINVAL = exports.EINTR = exports.EINPROGRESS = exports.EILSEQ = exports.EIDRM = exports.EHOSTUNREACH = exports.EFBIG = exports.EFAULT = exports.EEXIST = exports.EDQUOT = exports.EDOM = exports.EDESTADDRREQ = exports.EDEADLK = exports.ECONNRESET = exports.ECONNREFUSED = exports.ECONNABORTED = exports.ECHILD = exports.ECANCELED = exports.EBUSY = exports.EBADMSG = exports.EBADF = exports.EALREADY = exports.EAGAIN = exports.EAFNOSUPPORT = exports.EADDRNOTAVAIL = exports.EADDRINUSE = exports.EACCES = exports.E2BIG = void 0;
module.exports = exports.WSA_E_NO_MORE = exports.WSA_E_CANCELLED = exports.WSAVERNOTSUPPORTED = exports.WSATYPE_NOT_FOUND = exports.WSASYSNOTREADY = exports.WSASYSCALLFAILURE = exports.WSASERVICE_NOT_FOUND = exports.WSANOTINITIALISED = exports.WSAEWOULDBLOCK = exports.WSAEUSERS = exports.WSAETOOMANYREFS = exports.WSAETIMEDOUT = exports.WSAESTALE = exports.WSAESOCKTNOSUPPORT = exports.WSAESHUTDOWN = exports.WSAEREMOTE = exports.WSAEREFUSED = exports.WSAEPROVIDERFAILEDINIT = exports.WSAEPROTOTYPE = exports.WSAEPROTONOSUPPORT = exports.WSAEPROCLIM = exports.WSAEPFNOSUPPORT = exports.WSAEOPNOTSUPP = exports.WSAENOTSOCK = exports.WSAENOTEMPTY = exports.WSAENOTCONN = exports.WSAENOPROTOOPT = exports.WSAENOMORE = exports.WSAENOBUFS = exports.WSAENETUNREACH = exports.WSAENETRESET = exports.WSAENETDOWN = exports.WSAENAMETOOLONG = exports.WSAEMSGSIZE = exports.WSAEMFILE = exports.WSAELOOP = exports.WSAEISCONN = exports.WSAEINVALIDPROVIDER = exports.WSAEINVALIDPROCTABLE = exports.WSAEINVAL = exports.WSAEINTR = exports.WSAEINPROGRESS = exports.WSAEHOSTUNREACH = exports.WSAEHOSTDOWN = exports.WSAEFAULT = exports.WSAEDQUOT = exports.WSAEDISCON = exports.WSAEDESTADDRREQ = exports.WSAECONNRESET = exports.WSAECONNREFUSED = exports.WSAECONNABORTED = exports.WSAECANCELLED = exports.WSAEBADF = exports.WSAEALREADY = exports.WSAEAFNOSUPPORT = exports.WSAEADDRNOTAVAIL = exports.WSAEADDRINUSE = exports.WSAEACCES = exports.UV_UDP_REUSEADDR = exports.SIGXFSZ = exports.SIGXCPU = exports.SIGWINCH = exports.SIGVTALRM = exports.SIGUSR2 = exports.SIGUSR1 = exports.SIGURG = exports.SIGUNUSED = exports.SIGTTOU = exports.SIGTTIN = exports.SIGTSTP = exports.SIGTRAP = exports.SIGTERM = exports.SIGSYS = exports.SIGSTOP = exports.SIGSTKFLT = exports.SIGSEGV = exports.SIGQUIT = exports.SIGPWR = exports.SIGPROF = exports.SIGPOLL = exports.SIGPIPE = exports.SIGLOST = exports.SIGKILL = exports.SIGIOT = exports.SIGIO = exports.SIGINT = void 0;
const UV_UDP_REUSEADDR = exports.UV_UDP_REUSEADDR = 4;
const RTLD_LAZY = exports.RTLD_LAZY = 1;
const RTLD_NOW = exports.RTLD_NOW = 2;
const RTLD_GLOBAL = exports.RTLD_GLOBAL = 8;
const RTLD_LOCAL = exports.RTLD_LOCAL = 4;
const RTLD_DEEPBIND = exports.RTLD_DEEPBIND = 16;
const E2BIG = exports.E2BIG = 7;
const EACCES = exports.EACCES = 13;
const EADDRINUSE = exports.EADDRINUSE = 48;
const EADDRNOTAVAIL = exports.EADDRNOTAVAIL = 49;
const EAFNOSUPPORT = exports.EAFNOSUPPORT = 47;
const EAGAIN = exports.EAGAIN = 35;
const EALREADY = exports.EALREADY = 37;
const EBADF = exports.EBADF = 9;
const EBADMSG = exports.EBADMSG = 94;
const EBUSY = exports.EBUSY = 16;
const ECANCELED = exports.ECANCELED = 89;
const ECHILD = exports.ECHILD = 10;
const ECONNABORTED = exports.ECONNABORTED = 53;
const ECONNREFUSED = exports.ECONNREFUSED = 61;
const ECONNRESET = exports.ECONNRESET = 54;
const EDEADLK = exports.EDEADLK = 11;
const EDESTADDRREQ = exports.EDESTADDRREQ = 39;
const EDOM = exports.EDOM = 33;
const EDQUOT = exports.EDQUOT = 69;
const EEXIST = exports.EEXIST = 17;
const EFAULT = exports.EFAULT = 14;
const EFBIG = exports.EFBIG = 27;
const EHOSTUNREACH = exports.EHOSTUNREACH = 65;
const EIDRM = exports.EIDRM = 90;
const EILSEQ = exports.EILSEQ = 92;
const EINPROGRESS = exports.EINPROGRESS = 36;
const EINTR = exports.EINTR = 4;
const EINVAL = exports.EINVAL = 22;
const EIO = exports.EIO = 5;
const EISCONN = exports.EISCONN = 56;
const EISDIR = exports.EISDIR = 21;
const ELOOP = exports.ELOOP = 62;
const EMFILE = exports.EMFILE = 24;
const EMLINK = exports.EMLINK = 31;
const EMSGSIZE = exports.EMSGSIZE = 40;
const EMULTIHOP = exports.EMULTIHOP = 95;
const ENAMETOOLONG = exports.ENAMETOOLONG = 63;
const ENETDOWN = exports.ENETDOWN = 50;
const ENETRESET = exports.ENETRESET = 52;
const ENETUNREACH = exports.ENETUNREACH = 51;
const ENFILE = exports.ENFILE = 23;
const ENOBUFS = exports.ENOBUFS = 55;
const ENODATA = exports.ENODATA = 96;
const ENODEV = exports.ENODEV = 19;
const ENOENT = exports.ENOENT = 2;
const ENOEXEC = exports.ENOEXEC = 8;
const ENOLCK = exports.ENOLCK = 77;
const ENOLINK = exports.ENOLINK = 97;
const ENOMEM = exports.ENOMEM = 12;
const ENOMSG = exports.ENOMSG = 91;
const ENOPROTOOPT = exports.ENOPROTOOPT = 42;
const ENOSPC = exports.ENOSPC = 28;
const ENOSR = exports.ENOSR = 98;
const ENOSTR = exports.ENOSTR = 99;
const ENOSYS = exports.ENOSYS = 78;
const ENOTCONN = exports.ENOTCONN = 57;
const ENOTDIR = exports.ENOTDIR = 20;
const ENOTEMPTY = exports.ENOTEMPTY = 66;
const ENOTSOCK = exports.ENOTSOCK = 38;
const ENOTSUP = exports.ENOTSUP = 45;
const ENOTTY = exports.ENOTTY = 25;
const ENXIO = exports.ENXIO = 6;
const EOPNOTSUPP = exports.EOPNOTSUPP = 102;
const EOVERFLOW = exports.EOVERFLOW = 84;
const EPERM = exports.EPERM = 1;
const EPIPE = exports.EPIPE = 32;
const EPROTO = exports.EPROTO = 100;
const EPROTONOSUPPORT = exports.EPROTONOSUPPORT = 43;
const EPROTOTYPE = exports.EPROTOTYPE = 41;
const ERANGE = exports.ERANGE = 34;
const EROFS = exports.EROFS = 30;
const ESPIPE = exports.ESPIPE = 29;
const ESRCH = exports.ESRCH = 3;
const ESTALE = exports.ESTALE = 70;
const ETIME = exports.ETIME = 101;
const ETIMEDOUT = exports.ETIMEDOUT = 60;
const ETXTBSY = exports.ETXTBSY = 26;
const EWOULDBLOCK = exports.EWOULDBLOCK = 35;
const EXDEV = exports.EXDEV = 18;
const WSAEINTR = exports.WSAEINTR = 10004;
const WSAEBADF = exports.WSAEBADF = 10009;
const WSAEACCES = exports.WSAEACCES = 10013;
const WSAEFAULT = exports.WSAEFAULT = 10014;
const WSAEINVAL = exports.WSAEINVAL = 10022;
const WSAEMFILE = exports.WSAEMFILE = 10024;
const WSAEWOULDBLOCK = exports.WSAEWOULDBLOCK = 10035;
const WSAEINPROGRESS = exports.WSAEINPROGRESS = 10036;
const WSAEALREADY = exports.WSAEALREADY = 10037;
const WSAENOTSOCK = exports.WSAENOTSOCK = 10038;
const WSAEDESTADDRREQ = exports.WSAEDESTADDRREQ = 10039;
const WSAEMSGSIZE = exports.WSAEMSGSIZE = 10040;
const WSAEPROTOTYPE = exports.WSAEPROTOTYPE = 10041;
const WSAENOPROTOOPT = exports.WSAENOPROTOOPT = 10042;
const WSAEPROTONOSUPPORT = exports.WSAEPROTONOSUPPORT = 10043;
const WSAESOCKTNOSUPPORT = exports.WSAESOCKTNOSUPPORT = 10044;
const WSAEOPNOTSUPP = exports.WSAEOPNOTSUPP = 10045;
const WSAEPFNOSUPPORT = exports.WSAEPFNOSUPPORT = 10046;
const WSAEAFNOSUPPORT = exports.WSAEAFNOSUPPORT = 10047;
const WSAEADDRINUSE = exports.WSAEADDRINUSE = 10048;
const WSAEADDRNOTAVAIL = exports.WSAEADDRNOTAVAIL = 10049;
const WSAENETDOWN = exports.WSAENETDOWN = 10050;
const WSAENETUNREACH = exports.WSAENETUNREACH = 10051;
const WSAENETRESET = exports.WSAENETRESET = 10052;
const WSAECONNABORTED = exports.WSAECONNABORTED = 10053;
const WSAECONNRESET = exports.WSAECONNRESET = 10054;
const WSAENOBUFS = exports.WSAENOBUFS = 10055;
const WSAEISCONN = exports.WSAEISCONN = 10056;
const WSAENOTCONN = exports.WSAENOTCONN = 10057;
const WSAESHUTDOWN = exports.WSAESHUTDOWN = 10058;
const WSAETOOMANYREFS = exports.WSAETOOMANYREFS = 10059;
const WSAETIMEDOUT = exports.WSAETIMEDOUT = 10060;
const WSAECONNREFUSED = exports.WSAECONNREFUSED = 10061;
const WSAELOOP = exports.WSAELOOP = 10062;
const WSAENAMETOOLONG = exports.WSAENAMETOOLONG = 10063;
const WSAEHOSTDOWN = exports.WSAEHOSTDOWN = 10064;
const WSAEHOSTUNREACH = exports.WSAEHOSTUNREACH = 10065;
const WSAENOTEMPTY = exports.WSAENOTEMPTY = 10066;
const WSAEPROCLIM = exports.WSAEPROCLIM = 10067;
const WSAEUSERS = exports.WSAEUSERS = 10068;
const WSAEDQUOT = exports.WSAEDQUOT = 10069;
const WSAESTALE = exports.WSAESTALE = 10070;
const WSAEREMOTE = exports.WSAEREMOTE = 10071;
const WSASYSNOTREADY = exports.WSASYSNOTREADY = 10091;
const WSAVERNOTSUPPORTED = exports.WSAVERNOTSUPPORTED = 10092;
const WSANOTINITIALISED = exports.WSANOTINITIALISED = 10093;
const WSAEDISCON = exports.WSAEDISCON = 10101;
const WSAENOMORE = exports.WSAENOMORE = 10102;
const WSAECANCELLED = exports.WSAECANCELLED = 10103;
const WSAEINVALIDPROCTABLE = exports.WSAEINVALIDPROCTABLE = 10104;
const WSAEINVALIDPROVIDER = exports.WSAEINVALIDPROVIDER = 10105;
const WSAEPROVIDERFAILEDINIT = exports.WSAEPROVIDERFAILEDINIT = 10106;
const WSASYSCALLFAILURE = exports.WSASYSCALLFAILURE = 10107;
const WSASERVICE_NOT_FOUND = exports.WSASERVICE_NOT_FOUND = 10108;
const WSATYPE_NOT_FOUND = exports.WSATYPE_NOT_FOUND = 100109;
const WSA_E_NO_MORE = exports.WSA_E_NO_MORE = 10110;
const WSA_E_CANCELLED = exports.WSA_E_CANCELLED = 10111;
const WSAEREFUSED = exports.WSAEREFUSED = 10112;
const SIGHUP = exports.SIGHUP = 1;
const SIGINT = exports.SIGINT = 2;
const SIGQUIT = exports.SIGQUIT = 3;
const SIGILL = exports.SIGILL = 4;
const SIGTRAP = exports.SIGTRAP = 5;
const SIGABRT = exports.SIGABRT = 6;
const SIGIOT = exports.SIGIOT = 6;
const SIGBUS = exports.SIGBUS = 10;
const SIGFPE = exports.SIGFPE = 8;
const SIGKILL = exports.SIGKILL = 9;
const SIGUSR1 = exports.SIGUSR1 = 30;
const SIGSEGV = exports.SIGSEGV = 11;
const SIGUSR2 = exports.SIGUSR2 = 31;
const SIGPIPE = exports.SIGPIPE = 13;
const SIGALRM = exports.SIGALRM = 14;
const SIGTERM = exports.SIGTERM = 15;
const SIGCHLD = exports.SIGCHLD = 20;
const SIGCONT = exports.SIGCONT = 19;
const SIGSTOP = exports.SIGSTOP = 17;
const SIGTSTP = exports.SIGTSTP = 18;
const SIGTTIN = exports.SIGTTIN = 21;
const SIGTTOU = exports.SIGTTOU = 22;
const SIGURG = exports.SIGURG = 16;
const SIGXCPU = exports.SIGXCPU = 24;
const SIGXFSZ = exports.SIGXFSZ = 25;
const SIGVTALRM = exports.SIGVTALRM = 26;
const SIGPROF = exports.SIGPROF = 27;
const SIGWINCH = exports.SIGWINCH = 28;
const SIGIO = exports.SIGIO = 23;
const SIGINFO = exports.SIGINFO = 29;
const SIGSYS = exports.SIGSYS = 12;
const SIGPOLL = exports.SIGPOLL = 34;
const SIGPWR = exports.SIGPWR = 29;
const SIGBREAK = exports.SIGBREAK = 21;
const SIGSTKFLT = exports.SIGSTKFLT = 16;
const SIGUNUSED = exports.SIGUNUSED = 31;
const SIGLOST = exports.SIGLOST = 29;
const PRIORITY_LOW = exports.PRIORITY_LOW = 19;
const PRIORITY_BELOW_NORMAL = exports.PRIORITY_BELOW_NORMAL = 10;
const PRIORITY_NORMAL = exports.PRIORITY_NORMAL = 0;
const PRIORITY_ABOVE_NORMAL = exports.PRIORITY_ABOVE_NORMAL = -7;
const PRIORITY_HIGH = exports.PRIORITY_HIGH = -14;
const PRIORITY_HIGHEST = exports.PRIORITY_HIGHEST = -20;
module.exports = {
  UV_UDP_REUSEADDR,
  dlopen: {
    RTLD_LAZY,
    RTLD_NOW,
    RTLD_GLOBAL,
    RTLD_LOCAL,
    RTLD_DEEPBIND
  },
  errno: {
    E2BIG,
    EACCES,
    EADDRINUSE,
    EADDRNOTAVAIL,
    EAFNOSUPPORT,
    EAGAIN,
    EALREADY,
    EBADF,
    EBADMSG,
    EBUSY,
    ECANCELED,
    ECHILD,
    ECONNABORTED,
    ECONNREFUSED,
    ECONNRESET,
    EDEADLK,
    EDESTADDRREQ,
    EDOM,
    EDQUOT,
    EEXIST,
    EFAULT,
    EFBIG,
    EHOSTUNREACH,
    EIDRM,
    EILSEQ,
    EINPROGRESS,
    EINTR,
    EINVAL,
    EIO,
    EISCONN,
    EISDIR,
    ELOOP,
    EMFILE,
    EMLINK,
    EMSGSIZE,
    EMULTIHOP,
    ENAMETOOLONG,
    ENETDOWN,
    ENETRESET,
    ENETUNREACH,
    ENFILE,
    ENOBUFS,
    ENODATA,
    ENODEV,
    ENOENT,
    ENOEXEC,
    ENOLCK,
    ENOLINK,
    ENOMEM,
    ENOMSG,
    ENOPROTOOPT,
    ENOSPC,
    ENOSR,
    ENOSTR,
    ENOSYS,
    ENOTCONN,
    ENOTDIR,
    ENOTEMPTY,
    ENOTSOCK,
    ENOTSUP,
    ENOTTY,
    ENXIO,
    EOPNOTSUPP,
    EOVERFLOW,
    EPERM,
    EPIPE,
    EPROTO,
    EPROTONOSUPPORT,
    EPROTOTYPE,
    ERANGE,
    EROFS,
    ESPIPE,
    ESRCH,
    ESTALE,
    ETIME,
    ETIMEDOUT,
    ETXTBSY,
    EWOULDBLOCK,
    EXDEV,
    WSAEINTR,
    WSAEBADF,
    WSAEACCES,
    WSAEFAULT,
    WSAEINVAL,
    WSAEMFILE,
    WSAEWOULDBLOCK,
    WSAEINPROGRESS,
    WSAEALREADY,
    WSAENOTSOCK,
    WSAEDESTADDRREQ,
    WSAEMSGSIZE,
    WSAEPROTOTYPE,
    WSAENOPROTOOPT,
    WSAEPROTONOSUPPORT,
    WSAESOCKTNOSUPPORT,
    WSAEOPNOTSUPP,
    WSAEPFNOSUPPORT,
    WSAEAFNOSUPPORT,
    WSAEADDRINUSE,
    WSAEADDRNOTAVAIL,
    WSAENETDOWN,
    WSAENETUNREACH,
    WSAENETRESET,
    WSAECONNABORTED,
    WSAECONNRESET,
    WSAENOBUFS,
    WSAEISCONN,
    WSAENOTCONN,
    WSAESHUTDOWN,
    WSAETOOMANYREFS,
    WSAETIMEDOUT,
    WSAECONNREFUSED,
    WSAELOOP,
    WSAENAMETOOLONG,
    WSAEHOSTDOWN,
    WSAEHOSTUNREACH,
    WSAENOTEMPTY,
    WSAEPROCLIM,
    WSAEUSERS,
    WSAEDQUOT,
    WSAESTALE,
    WSAEREMOTE,
    WSASYSNOTREADY,
    WSAVERNOTSUPPORTED,
    WSANOTINITIALISED,
    WSAEDISCON,
    WSAENOMORE,
    WSAECANCELLED,
    WSAEINVALIDPROCTABLE,
    WSAEINVALIDPROVIDER,
    WSAEPROVIDERFAILEDINIT,
    WSASYSCALLFAILURE,
    WSASERVICE_NOT_FOUND,
    WSATYPE_NOT_FOUND,
    WSA_E_NO_MORE,
    WSA_E_CANCELLED,
    WSAEREFUSED
  },
  signals: {
    SIGHUP,
    SIGINT,
    SIGQUIT,
    SIGILL,
    SIGTRAP,
    SIGABRT,
    SIGIOT,
    SIGBUS,
    SIGFPE,
    SIGKILL,
    SIGUSR1,
    SIGSEGV,
    SIGUSR2,
    SIGPIPE,
    SIGALRM,
    SIGTERM,
    SIGCHLD,
    SIGCONT,
    SIGSTOP,
    SIGTSTP,
    SIGTTIN,
    SIGTTOU,
    SIGURG,
    SIGXCPU,
    SIGXFSZ,
    SIGVTALRM,
    SIGPROF,
    SIGWINCH,
    SIGIO,
    SIGINFO,
    SIGSYS,
    SIGBREAK,
    SIGLOST,
    SIGPWR,
    SIGPOLL,
    SIGSTKFLT,
    SIGUNUSED
  },
  priority: {
    PRIORITY_LOW,
    PRIORITY_BELOW_NORMAL,
    PRIORITY_NORMAL,
    PRIORITY_ABOVE_NORMAL,
    PRIORITY_HIGH,
    PRIORITY_HIGHEST
  }
};