// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { SHA256, hash } from "./sha256";
import { encode } from "@stablelib/base64";

const vectors = [
    "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    "bjQLnP+zepicpUTmu3gKLHiQHT+zNzh2hRGjBhevoB0=",
    "tBP0fRPuL+bIRbLuFBr4HehY307FSaWLeXC7lmRbyNI=",
    "rksygOVuL6+D9BSm49q+nV++GJdlRMBf7RIazLhbU/w=",
    "BU7ewdAhH2JP7Qy8qdT5QAsOSRxDdCryxbCr6/DJkNg=",
    "CLteXW6qwQSe3giT0w7QIrGk2bW0jbQUhx9Rycs1KD0=",
    "F+iNsYev1iwW5d6/PmUnzQBrwBK8kLUagQzYDC1RH0M=",
    "VzVawzA8FI8RrvfLF5RWuSMs3jOoGN/aLC/LkyV0mms=",
    "ioUf+C7nBIrQnsOEfx3fRJRBBNLL0X7049sixnhaDUU=",
    "+DSOCx3wCDPLu9CPB6vezBDA77eIKdeCjGKn820MxUk=",
    "H4JaovACDvfPkd+jDaRmjXkcXUgk/I5BNUuJ7AV5WrM=",
    "eKYnMQPRfDmgthJuImzscOMzN/S8ajgGdAG1SjPnjq0=",
    "//OpvN03Nj1wPBxPlRJTNoYVeGjw1PFqDwLQ8dok+aI=",
    "huupR9UMLAFXD+G7XKVSlY2rvbtZsGV/DybiH/AR5cc=",
    "qxB/G9Yy08P1xySpnQJPf6oDPzPAdpY4S2BL/nisNS0=",
    "cHH8MYj95+flANR2jxeEvt4aIumRZI3KudwyGaz/HUw=",
    "vkXLJgW/Nr695oSEGijw/UPGmFCj3OX+26aZKO46iZE=",
    "PlcY/qUajz9brKYcd6+rRzwYEPi52zMCc7QBHOkseH4=",
    "eglswScCvPpkfuBw1PO6TC0dcVtIS1W4JdDtumVFgDs=",
    "X5p1NhPYe4oXMCNzxK7lb6oxDTsktq4YYtZzqiLheQ8=",
    "566/V39gQS8DEtRCxwofphSMCQv1urQEyuwpSCrneeg=",
    "da7p3Mn7593JOU9bxdONn1rTYfBSD3zqtZYW449ZULU=",
    "IstN8Azd1gZ61c+iu6mFfyGgaEPhpuOa0aaMuaRauLc=",
    "9qlUpoVVGH2IzZoCaUDRWrKn4kx1F9Ic7rAo6TyW8xg=",
    "HWSt0qY4g2fJvC0fGzhLBppu84LNqqiXcd0QPihhOiU=",
    "tynOck2aSNOITb/L7h03k9kisp+p1jnnKQr0l4Jjdys=",
    "uFjagNilfcVGkF/RR2Euvd08kYhiBAXQWPnuWrHmvFI=",
    "14dQcmFVqJyRMdDs8nBLlzuHEIZb+egxhF3k8ty8Gdo=",
    "3Cf46O4tCKK8y7Lb1sjgf/uhlBAfw0WMNN7VX3LAlxo=",
    "0JvqZd/0iSihS3l0HeMnS2RvVayJi3Gmb6Pq4tn6zXc=",
    "8hklhLZ9o138JvdD5fU7sDdgRviZ3G2r1ee1Qa6Gwy8=",
    "TyPCyoxcli5QzTHiIb+20K3KGREdyo4MYlmP8UbdGcQ=",
    "Yw3NKWbEM2aRElRIu7JbT/QSpJxzLbLIq8G4WBvXEN0=",
    "XY/P76mu63EfuO0eS31cipuvpG6OduaKoYrc5aEN9qs=",
    "FM2/FxSZ+GvRiyYiQ9ZpBn7727VDGkgonPAvK1RIs9Q=",
    "8S3RI0DLhOTQ2ZWNYr58WbuPckOnQg/QQxd6xUKiaqo=",
    "XX4tmx3LyF58iQA2os8vn+e2ZVTy3wjOxqqcCiXJnCE=",
    "9NKF9HoeSVmkReplKOXfPvqwQfoVqtlNseJgCz85VRg=",
    "ov0OFdcsnRjzg+QAFvndxwZnPFQlIIQoWqpHqBJVJXc=",
    "SrojrqXiqRt4B88wJs3RChw4UzzlUzJoPUzLiEVuBwM=",
    "X6pO7DYRVWgSwtdLQ3yMSa3T+RDxAGPYAUQffXXNXjs=",
    "dTYpphF/WiXTON/xD03T0H5j7swur46r53P2OZcG/mc=",
    "QKHtc7RgMMjX6IaCB4xasa5aLlJOBm6Mh0PEhN4OIeU=",
    "wDOENoKBjEdeGH0mDV4u3wRphi36O7DBFvaBaintv2A=",
    "F2GexCUO9l8IPiMU7zCveWtvEZjQ/d+7DycpML+buZE=",
    "qOlgx2mpUI0JhFHj103Voqxshh6wNBrpTp/Cc1lyeMk=",
    "jr/rLjoVnp85rXzAQOZnja3nDU9Zpn1Sn6dq8wGrKUY=",
    "74p3galcMvoC6/UR7aPcbic75Zyw+eIKT4TVT0FCd5E=",
    "Tb3CsrYssAdJeFvIQgIjbbw3d9dGYGEbjliBLwz95sM=",
    "dQn+FI4sQm7RbJkPIv6BFpBcgsVhdW5yP2MiOs4OFH4=",
    "piLhOCnkiEIu5ypfySyxHSXD0PGFoThLgTjfUHTJg78=",
    "MwmEfO5FS0+Z3P6P3FURp7oWjOC25WhO9z+QMNAJuLU=",
    "xMZUChX8FAp4QFb+bZ4TVm+2FOyy2awDMeJkw4ZEKs0=",
    "kJYswSrpza4y18M8S5MZSxH6yDWULuQbmHcMYUHGZ5U=",
    "Z18orMC5CnLRw6Vw/oOsVlVV2zWM8Bgm3I7vsr98oPM=",
    "Rj6yjnL4LgqWwKTMU2kMVxKBEx9nKqIp4NRa5ZtZi1k=",
    "2irk1rNnSPKjGPI+erHf30Ws3J0Em9gOWd6CpgiV9WI=",
    "L+dBr4AcwjhgKsDsansMOoqHx/x9fwKj/gPRwS6sTY8=",
    "4DsYZAxjWzOKkrgszk/wcvnxq6msUmHuE0D1kvNcBJk=",
    "vS3o9d0Vxz9o39JqYUCAwuMjsrUbG17Z15M+U10iO9o=",
    "Dd3ijkCDjvb5hT6If1l9attfQOs11XY8UuHmTYujv/8=",
    "S1wng8kc7Mt8g5ITvLtqkC1/6MLshmh3pR9DPqF/PoU=",
    "yJ2oLLzXbd8iDk6QkQGbmGb/2nK+4w3h7/5smXAaIiE=",
    "Ka8mhv1TN0o2sIRmlMw0IXfkKNFkdRXweHhNac255Ig=",
    "/eq5rPNxA2K9JljNyaKej5x1f8+YEWA6jER80dkVEQg=",
    "S/0si28e7Hoq/rSLk07ksmlBggJ+bQ/AdQdPL6uzF4E=",
    "tt/SWfbg0H3rZYqIFI+CU/m7u3Td1ts+2+FZpWvDUHM=",
    "j6WRO2KEfUK7S0ZOAKcsYS0qsN8q8LmpavjTI/pQkHc=",
    "fe2XnAFT67nvKKFaMU0LJ7QcT47tcAtUl0tI6z7K+Rw=",
    "HPOqZR3PNdv+KW53CtfrxOALzM0CJNspYYPclS0ACMk=",
    "V2fWmpBtSGDbkHnrfpCrSlQ+XLAy/OhGVUrvbOtgDh0=",
    "gYnj1Udn1R6NGUJlmp4pBfnsOucoYMFqZudbjMm9IIc=",
    "EH3ivHiOEQKfeFH44bC1r7TjQ3nHCfyEBonr09H1G1s=",
    "Fp9vCTqb6C/r4aakRxQlaX7CXVBAtHLFsYIq7qJiWYg=",
    "IIfr01iuPqKgkvwZwt/uV8XwhgKWvHsFfBThInxcudE=",
    "GCq1b3c55DzuC5uh6SxLKoGwiHBVFqUkORAVl0TyG+k=",
    "CB9saImaSKG+RVpVQWEEkh0v5L2uaW9LcvnZYmpHkV4=",
    "XOAjdswlaGG3j4fjR4OBS6GuxtCatQDVee2O6VyK/Mg=",
    "uT5AdATj6V8g/WRzZeDn9Gr6vprx/wg6+ZYTXgDVQAk=",
    "6B+oMrN76O2PedopmHqk1hMQ3LFLKFne34+x2qJUH9M=",
    "xWcF/qWxELjcY2iFM87SEWfmKAFzh8iFQjuDWlXt1e8=",
    "wiJihdCKJFoXBY7S0krQlbcU9giuNk/d8Rngp9+JBUA=",
    "+cJw2oeTIhpoCaxoX91PU4fg/h7mqvAcdPHgpxliFhQ=",
    "5pvv1u9/aFw240OsFwLYetag5KyMDVxSHQSq1O8LdFg=",
    "TjAzVirXSn1D61/1/COCYixjB8sQ4kWtYtp3xMY8sXg=",
    "LqF2KUclZKWeXrhFos3QT0Qt8v8mvMhm5AD3cVjWEqE=",
    "uQIj33TdSaihRh80Dy16kPlpA8y7W8PHTqNlj8iUiyA=",
    "4CCfQrkn7JwPbWp2AH7VQOm91uQnszaKHqbF51ZZct0=",
    "ENm9QkEUMZwJma32KI90BgzYkY7xIognpiabK/DwiAw=",
    "fRl4plrJTbvNxi49gYUCmf4Vfdm3vZ4BsXAVYhDSgVo=",
    "4FLf+eHJSqpJVW+G+tVQKaSHWDn9pX9QBfTEQDh2slY=",
    "WNKUWbITCi4VElLUCLlebaxCTFZAYuuRHMdkQMuSbKA=",
    "TkUww5Ixb1mOG9B/MhZjgKj3EqM6SOnrQkcTHsXcBdM=",
    "oJydPkI0LH3qRO20rrSM9nJ8rNgDKhLPd6JYKfwknTI=",
    "65eNDxrAPOXDUQtfShYHOnor3BXEq3d33PAQMMwxZmc=",
    "fRkFo6zoJ+oaxRxPoIwoHtO+h+f06SjWlr/eNcjy3A8=",
    "CDWbEI+lZ/Xc8xn6NDTaarvB1ZX0JjcmZkR/Ccxah9w=",
    "p7ODD/qw8rurvvbfCxaaeRcAi/I4iAu/jCC44AAHcxI=",
    "tPXZsVVZlMXrrr2CkY1WCjv4KWKhcaFhTnVRk56UM2Y=",
    "AU7K6hs3iQDxISiYxt2wFWXYGvHQ73jfXijUbpyvfPw=",
    "vOCv8Zz1qmp0aaMNYdBOQ3bku/Y4EFLunn8zklyVTVI=",
    "RWXXuJjM6jE5rSYPknMRX4BrMAeddoMhjE4+zUOvOzM=",
    "3a3rZg/okCyfstubbPI3yc5bMXUzmAhcQ2frWRC5zBM=",
    "wVqJKBMfZofdEPPBFd3418jy334Y0SwIxP0W9mbOYLo=",
    "ro49eZsTU6OYFfkOzuvvomXMRI/jn68gCMsgeEyy358=",
    "mFRTcaPZmBq+WrSjKh17L63ZgB2J2lKpSk94pCdA0hw=",
    "YyPc4vizoE3OqNIFYCNIxAQDyyAMZ36xocD+N+226y8=",
    "gVD3xdqRDXCf8C3fhd0pPGomcmM96M2jDy4KpYsUsMQ=",
    "RNIdtwcWvXZEyw2Bn6Z5GAXrxSbqMplqYOQdx1P8+vw=",
    "ubfDdcykXbGUZuvQ/nyeFHlIzELByQ8FeXKM+yZRlW0=",
    "pHpVGwHlWqqgFVMaT6JqZm8evUukVziY3nEri14Mp+k=",
    "YHgOlFG9xDz0Uw/8lcuwxOsk2uLDn1XzNNZ54HbAgGU=",
    "CTc/En005h27qovESZyHB08t2xDhtGX1BtfXChUBGXk=",
    "E6qptftznNsOKvmdmsCkCTkK3E0cubQfHvlPhVIGDpI=",
    "Wwoy8SGVJPXXKwC6GhscCaBf8QyDu3qGBC5CmI8q/AY=",
    "MnlqCiRupn63he2i4EUZK51uQLn+IEeyHvDO6SkDllE=",
    "2pq4kwmSqfZezOxMMQiCyrQopwjmyJkYEEaoxzrwCFU=",
    "nJRVc4LJZnU8jKsJV+rtvh1ze1/LNcVsIg3dNvii01E=",
    "0yqwCSnLk1t51E50xadF20YP95Teo7eb5Awcxc9TiO8=",
    "2hh5ftfDp3fwhH9ClySi2M1ROObtKJXD+hptOdGPfsY=",
    "9Ssj2x+7be2J70KiPODIkixF8lxQtWipO/HAdUILu3w=",
    "M1pGFpKzC7odZHzHFgTojmdskOTCJFXQuMg/S9fIrJs=",
    "PQjE173afskisHQd81feRue9EC+at6XGdiSrWNptnXU=",
    "zGO+kuOpAM0GfaiUc7YbQFebVO9U+DBcL/zIk3Q3kuk=",
    "hlRH/E+uAUcfL8lzv7RI3gAhdSHvAuMhTVF36onD7zE=",
    "PapYL5VjYB4pDzzW0wS/9+JanuQqNP+6xc8r9AE04NQ=",
    "Xdp8t8IoKlVnb4rVxEgJL0qevWUziwftIk/Ne2xz9e8=",
    "ksoPpmUe4vl7iEtyRqVi+nElD+3v5evycNMcVGv+qXY=",
    "Rx+5Q6ojxRH29y+NFlLZyIDPo5KtgFAxIFR3A+VqK+U=",
    "UJnGpWID+Wh/fTP0v99XbTHckfa2lezqOLJ3DIdjETU=",
    "jTm2C5x2fFiXWycMHWsTybRQflruetSWo1KOTH+IByE=",
    "OswSj68BB3eJdG7c/RBR2QvBWRNCQC2bPN0G1zFXAqQ=",
    "zhZi1Mix9U0yJZPuirOFdj5R3qksm01WvA4vhREfBDg=",
    "qstl58kFWxBc8CxHAkzfeaWCKRMuZsoN3w1072o/1cg=",
    "R4qxNEh+3pkhYZ8e66wwZGkZ1qtxRsaSjERzLMyJeSk=",
    "agU4SM/oPA/IyKgd2E9rlGxjGTzSXN1drUXwi+gBnok=",
    "/8VVIDlF306B118xbkwl/cC8TpZBL09Gk0nrcW8AGn0=",
    "gdRb4GMp1jotioWZ1EVnaTO+oWePxYZ5W07LuDjU0Vg=",
    "0IgJqeWwD8kmazgTZ59ArNbCWW095PKPTSDZjEQKpIM=",
    "4XlqA8ntKH73V+7ncdEW5N/YxBb2tanlksHw6BwN6qE=",
    "tKTl1lYPo+likGRUasl/FM1NAjwJfMvwaDjM70/c2PE=",
    "myk9dI0wJA093Elrci/JLVf2ZScbBg6CQQ2N4Ylw3B0=",
    "7xRSMuWxljDgs4mJH2iBYdBHwmnHzyLb/xFFFFcvWBM=",
    "mF8ZEocDr+7jjSJ5fAyuX0UMwpCmpbklPdkIQg6QMv8=",
    "ZvlSqDM5J06yh7ZO97Ao2IkVrG3wahg/fAQ2+islEHs=",
    "Rq8ivhtXbecZccJeiMGKMpXwrHYqQSoREFzvIPovWEA=",
    "6BkB9BNEaDRIoD2yWdEHHJsvkQAXga40oLOaCYg4H8I=",
    "pcYCwUAa1QKe//rxiPJ/m5a0QWMad0SFUe4ze53A5+g=",
    "gxez+yGBFYz9zPrrj4oXNpYUdnF4Aa6d58mlncOV7xw=",
    "eDTQUVZn5Gkj86bAVCaOBrwjAUkbjtoiXR9DF5GCBv4=",
    "8isuYU6S1kU2ErcHOFA4MAKT0swpKxSLxTNXVLXqMP0=",
    "HWg/KnxYrHT6tFdhI1w+loLxMpttluJgp8Z9LViyM7Y=",
    "9YTv+MUVL7ayaZgGUIzbcUgTjstt1WSwK/wCH9DsWGo=",
    "r6hmEEb6g+fCYRZ/NfY3nADTo6nKRsSPsLrSxJ3aeTM=",
    "n+3Io6pDDW2RG3FKFR5fF6Ss9S9COWF+7HybnXd1YSs=",
    "jeICucKDwjbaXSzV5VbenBgiwZ2rNuCfaQz3DTyWPpc=",
    "Mblv7L8MKDminErNcJjCcByrFS1CTiZs8HoWh1YENl4=",
    "PxoPZe4S9+/mRHckc1mvjvAs8n0QRIG09ZIvcUMrgXg=",
    "9MNPdk4KnjfAgNKPAcS74k2tDMZaiLH6ayiAKkt5mGU=",
    "hax/N2H3d3LijDqbZYqg4E2d06a8NlwwMklIsO3hi4g=",
    "RI67yeGjEiCi84MMGO72G5vQcOUIS3+io1n+cpGExxk=",
    "l/XqwHzcdvHw+qELAIHPr/P6tyCVaApFFscj/emJFt4=",
    "a1crIcqgb8ahvat32jvAc3eRkIjulmA2KDVMCzgAZh0=",
    "J/zcx+LuAPHcsHqsRFpDarXe4sFLBGIazTh+xQ6O+lA=",
    "6DnPwh6Od5l+ZD76BPcVDmzGiGTL6nRa769HqTY99wk=",
    "umutBprMLQvt824rbMAF0x63aw2p3kbgkgn/AEriUgA=",
    "fT5q1tkBfXnRXrUY67rIKNZEScOfCULubneYR552FaQ=",
    "aXxYHRjtsmkiSfwHquMH08wmMDPLMvFu88C1dClpWkM=",
    "f3GT3TxsJzzdZkiPiqXb41QqIr8PzafW+5MjUXjEWJ4=",
    "bpRNYh+eE7wi1K5oqqjLFWBe2WgKzX8W5bD5QUm2NM0=",
    "SRYC9yKypu85dqaW4obZnhklnTpP+5V9GKcSim+zeow=",
    "8rUaGlwS6bB/FSgSiV8qtRqXJwIeOJVVpYUH6n/xblE=",
    "36vJfyFUA6PMK88TKjX8gy6Ht94PLnVg8q2djwbji2M=",
    "c7HxAAx2d+vc7yoqJeJ7BtnBYyCa3Xehbw4rcOVtXFI=",
    "IYA8h3uBtZABXatDBWjPTXwCR+6mFHoYrE/DSSmWy3k=",
    "t+PD6jJqX9VY1w7+K8ZGlzKiiU397KEGCTYRpKjUsCU=",
    "WukdIpXmcGGRt2BmHUjjZUQd4SNAAGEwxCx7OPqkg5M=",
    "7+PzU3H3ACFzYhVUA9Kz+RK3Udada/gKWahtSRFxhlE=",
    "rzfu4Wti2WZZRNojp3EvRUZAzuuVjyD9M/3R7lFdq9k=",
    "JTesKdwVYe5JoLwarbhjxDWmadGNXn6JDtPhGgFM5BE=",
    "42CRjYWwLWVepXLQgcg7AZaR6GZZCNam+/nVZzoT2JI=",
    "N+chhWBgNSfMjbmlodqJ+iffHafdnFTAx6JAXYpSCKE=",
    "YhAJ8L+ModcO7fow624peXlEabTpnuOF/ZUBcStFy2o=",
    "sUWTRRY67Rw1YwKlIw+JElZLBPNAYQsY7xqixHtBiYE=",
    "gvY6HQB/2XlnVqu79RwkaITd49ec+crKzJAUYq514/8=",
    "eNjOHM1Gz5L7TiVfGDvJ81Xl5JSzGAwNqRVOF6HWH3Q=",
    "iILuhQEGm6UHo6XzCejj+dz7E5h+wpPGD+uk8fq8W6c=",
    "xi7929YiCUSGwe3tynStR8jOTHZh2fWMJyNAO7QrRbY=",
    "kzAchUjzr8JdfhV+r3yNv17bApvYKRNmAFkwZ81LDFw=",
    "GZYWhsZtnhDizjihRlISHlM9XwS77qGTIQywp7iDlvM=",
    "tFTb4H+xAOp0PNGT6hlTqebWKgf94PMyXDYuTz17aU8=",
    "0oD0c8JRy3XJGIDqDsoqLxzaMVK+9Uo4xKOu2tYVyBk=",
    "i0pUSDehoCgPqKfIKGXCehBks8xigf2gdTVmubsQSoc=",
    "far6eu19Y9BqmLe294XqtUJ9CE8w1cnubdDS862jKeY=",
    "3AscYcQAHP5wfFKHXgJuTu+6/Amrdn+POsVenHhAbko=",
    "zYVcnss82Ebv0REa6wLIVj9675mIrExZf6s1tCNWBMU=",
    "KOzjNynN7/eahjzfo1m1HOvin4qUeVQwYzjBGomGbmI=",
    "Waau1qRNWlJWUonMw3eWa2oatBrDOeckdfSbsTa++pE=",
    "NFjQeFdQP8rau8Xfx7kFvDc7d8sFjYf+s1RDoKp84gQ=",
    "dszqWlHZPCOL06dF/4rNPISKFchdEuPVyXQ+zAlHc6Q=",
    "GQHaHJ9pm0j2smNuZcv3Or+Z0EQe9n9cVApC9wUd7G8=",
    "dH22/whzH/eQgiTFD3H1H+8Sg+ZTQeLbzcZk8PQb+MU=",
    "B/8QgNPUqu2c13hQwCB+def5aXvtFajNpwV/aiTAENI=",
    "jwUS6AClEZU6KL8Ru16cMFxAJoZ7yaMfdsuW/FvYcCc=",
    "/tiG/jl34tIaaw21l3uN7uW0VtMj+MII0kuK3/CPEd4=",
    "6ph4CpLDChA40gvT0MhxBjUzBr+XUd9cPIj51LMaAIg=",
    "EhrqaE1NYoZlFFZCk/GSjG1NnpqmLyvS35Tzkr91qDg=",
    "bwOQC6hpgKefb4pdYzvZ6NycowaQyGsxzoktgxFaIyY=",
    "lOnEgwF1PxI7rVTZF9E9pkwYsXidqF3I7T2EJ8VpePc=",
    "+TSupJJitP1YfrdOvixpuFesoHh2rK3CP4nWwLu8zdU=",
    "AtU7RSnDg2PB3ckFPj5YvLbjAB8BwmqnxKnheITMceU=",
    "AYUTyObPm6ZjUUKJhOXUSCT+42TCa+0VM8o+zo81dMM=",
    "ISCWIrBkt/gcWjUkq+fJcI1Fha1OohsHLOdpk6/dO/k=",
    "qjYRY/a1P25t4p2q4oozao98Bb9eim7qpGpRvNZqx/c=",
    "3t/yGE3hIcYOyUxMuUoEUMrEclfFavqPLhHF9k091mE=",
    "HWQTffchB4s1vcGjWVpzzry+SYZfswjHh5FUDR00nNc=",
    "nULXS6xEPq+9mHgUW3RTh+sTlxdDMlZLyPpttBSrOB8=",
    "EaYXHY0ZP3z4MxUZm7On4H6OAMM+W2IIVeC4ec+kxow=",
    "qc2gWYcnLucRAPgfWa05WbCXildiNcaDbsy2WpV3Em8=",
    "/VMSYhCr/LDWpWyQhTtxbQKs2N+jGaYM9RsaK0721/M=",
    "F8FFMxXj3BiQ6KHChI14HSB61zM1RQ6aI25EyKKtOwY=",
    "vS4Bg1ImxWoy/1jfOObheYMDNdQDOkDZxg0mmxRcn2o=",
    "O3oi2e8InUqjgu/z3uunPUHkr1iwln6chgPYYEMcPsc=",
    "en+J8AsOmxuemUkKe52c53QKQDBH77uUrTX9E6NbSsY=",
    "fkfd6aLlKgBn+AoUmr9gbqTsJWkGN2MtNFYUMsBziHc=",
    "XVdxhWvVJmK9ION0JKvznh87UCZP8J/9YrPcyPBdAfA=",
    "bIUbUOEVzs/jtLkQ5qdAavKC+dvNTOnMoNuNSIoSXwE=",
    "X25h+jzckShbCfGTSzHkJhCN+tf/BMNnZR9KWfXHhyI=",
    "raayaDqIX1/vZXuMm0SkTx5zmvizXGSlHEBy0qhmAsQ=",
    "Omo2iVJitK95/cR26QqevAYyDmTdhBe467pfb+yH6qw=",
    "wsZ3h7hjGTMOTQZXvCwK1nSC3/Bke5JcybjCClNe3Dc=",
    "b0c89j+FT7H6WtWcRj9kDdoaKhusrA4V/6QA5mOn9uc=",
    "YZpMe6bjT9IkbvPO1vHhOlCRqo6pkLWaXoZHnJy1M78=",
    "luBUYidx6/bU7CBqBMaODYus7ehqcaGlRvXi+LWRePo=",
    "yp3txCOY5gUG5IoqyVwZiC2zwa3rjaWHfmrZ20tMTNA=",
    "8PHtI20aPblQH/Xyxc1D1I8vww1ZzOMVXn8GlcDVKfk=",
    "k7LvlOgTN0MrJnzVA0eUXzLZtomxmMzUlSFdoIisibE=",
    "aeZA4iw93R4dg5GqTbVKpqyKpg/2h6WYbxvqhsSWUas=",
    "b1jOWZ+srpDZSih+m/jLBurxfaLCk3AO62vAh/7GdrE=",
    "XhwQKEcQ9cLbSPiN49BRV5ZDoe0EKvqEanhEiVNRp3s=",
    "q/S6/N2zi784VeR7XmG3Xe289CqkT/1LuF0LCNl+JoI=",
    "IRiCrqyKWZsKVewoDhqXiSPt72nNhlQby9WNuGTEXqw=",
    "YypIp6mjrFlmpcqnHUVu8flfQChZ32EVfLle2VEjdxQ=",
    "a5QlpMTTnJMv0xBwS8FE0oPxwJC+qYnJs+lvwJJdpTE=",
    "F2EO+5nQ+eTrGqE+sdhiicfd430Xgz7SPdEORp4lQ/8=",
    "9ee99IgNh6FAVb83Eyj+c5YxX0hIkA5/JHHF7bKkwjw=",
    "W2zKG4rJGZ0ZHqMRUtRwV/oymZSzktty7aKdu2DRdQw=",
    "S5bsO5Hp92SsAifKffRRvYKUzUYpgEe0O5YK4cCwr8U=",
    "xv7+G/vm9TZL8OQER//KJ/3lXxzYFeH6O6+0akHJF0k=",
    "VSpp0FKuKYCqku9EtKh1L8WF1wEn2d8axTE34mZ4bk0=",
    "Np19oWFWxeLA1RnNurOZanJJ4g0+SMNqOoc+mHGQvYk=",
    "72fgcjIw9sU1/1VuRcohdOHpfe7TBunofxtlV5B27AY=",
    "LLHnXNdQWieDdpJ28wsSLLE2+70DMAUQtxpxlspnCzc=",
    "EhG2iFiQvkj4mTTsUkbxzjz/9GxibPzWhtX9zpsfuDA=",
    "1qi9sB52P7ZPOgJRLnvpBWeaWt1rtAj4dQ1nnRfK2S8=",
    "P4WRESxrvlyWOWWVTikxCLcgjtKviT5QDYWTaMZU6r4="
];

// Test input is [ 0, 1, 2, ..., 255 ].
const input = new Uint8Array(256);
for (let i = 0; i < input.length; i++) {
    input[i] = i & 0xff;
}

describe("sha256.SHA256", () => {
    it("should produce correct hashes for test vectors", () => {
        for (let i = 0; i < input.length; i++) {
            let h = new SHA256();
            h.update(input.subarray(0, i));
            expect(encode(h.digest())).toBe(vectors[i]);
        }
    });

    it("should correctly update multiple times", () => {
        const h1 = new SHA256();
        h1.update(input.subarray(0, 1));
        h1.update(input.subarray(1, 120));
        h1.update(input.subarray(120, 256));
        const h2 = new SHA256();
        h2.update(input.subarray(0, 256));
        expect(encode(h1.digest())).toBe(encode(h2.digest()));
    });

    it("should return the same digest after finalizing", () => {
        let h = new SHA256();
        h.update(input);
        let d1 = h.digest();
        let d2 = h.digest();
        expect(encode(d1)).toBe(encode(d2));
    });

    it("should throw when updating finalized instance", () => {
        let h = new SHA256();
        h.update(input);
        h.digest();
        expect(() => h.update(input)).toThrow();
    });

    it("should reset instance", () => {
        let h = new SHA256();
        h.update(input);
        let d1 = h.digest();
        h.reset();
        h.update(input);
        let d2 = h.digest();
        expect(encode(d1)).toBe(encode(d2));
    });

    it("should return 32-byte digest", () => {
        let h = new SHA256();
        h.update(input);
        expect(h.digest().length).toBe(32);
    });

    it("should correctly hash 3 GiB", () => {
       const h = new SHA256();
       const buf = new Uint8Array(256 * 1024 * 1024); // 256 MiB
       for (let i = 0; i < buf.length; i++) {
           buf[i] = i & 0xff;
       }
       for (let i = 0; i < 12; i++) { // 3 GiB
           buf[0] = i & 0xff;
           h.update(buf);
       }
       expect(encode(h.digest())).toBe("BvFiHnDTVyn76NY32YGVu51ZEVq92dl55yjfoHQSQzA=");
    });

});

describe("sha256.hash", () => {
    it("should produce correct hashes for test vectors", () => {
        for (let i = 0; i < input.length; i++) {
            const digest = hash(input.subarray(0, i));
            expect(encode(digest)).toBe(vectors[i]);
        }
    });
});
