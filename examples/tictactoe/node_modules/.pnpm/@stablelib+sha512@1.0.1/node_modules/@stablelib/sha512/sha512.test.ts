// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { SHA512, hash } from "./sha512";
import { encode } from "@stablelib/base64";

const vectors = [
    "z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==",
    "uCRNAomB1pOve0Vq+O+kytY9KC4Z/xSULCRuUNk1HSJwSoAqccNYC2Nw3kzrKTwySoQjNCVX1OXDhDjw42kQ7g==",
    "gFNsYXDdhibcCBrxSNOewv1dCQzFeKdmR+eQP9NL0C5DM+zlew4k/xFvQ0Kbb/VBg0vUDvDI01Y6zvXtD9JUuA==",
    "gIHaX5wePQ4aoW9gTV5QZFQ8/117rOK7MSJSRh4VGz/g8DTqjcHaz/M2GoktYl++G2FM2iZfh6RzwksPodkd/Q==",
    "TsVLCeKyCd25pnhSK7RRdAxRP0iMsnoIg2MHGFcXRRQZIANq69t4wLTNeDpKbuzJN6QMYQTkJ1EtcJpjS0EvYA==",
    "t7cKCxTX+iE8bM08v/yLuPjhGoXxETsOsmoAII8rmzod1KrzmWKGHharBiJ0NCoc4fnbo2VPNvwzgkVYnylsKA==",
    "LzgxvMyUzwYbz6X4wjwUKdJuO8a3btrZPZAly5HJA69s+ck13DcZPATCxm59neF8NYKEQYIYr+ohYBR6qpEvTA==",
    "t8C0f0L3ICv30o1oNL7jZfwBzj8MjI3yS02UBAbC6cIwuoiFTpRuvNeGwYx0iWn98BI2K3yWQAYEtgWJUP6q1A==",
    "ikFMWGDPG+e8hTFEL2mmXvLs8LfK2ZlLy0Bwl+t0zLkuk6q9JL3mAzESO02QBoTKe+YCcJnUlGv1N/TWxt89gg==",
    "i15ef7ZTDM4b//0bGqM40yguhIMxm/Aou2dLtq64IA2jiWR+PYYxUD3FxIe7+n0HRYRJNhWwNoSeAkJhDqR1jw==",
    "D4nuH8t7Ck94CdEmegKXGQBMWl5ewyOnw1I6IJdPmj8gL1b626TNno1lSrny6W3Fx5XqF2+iDt6NhUw0L5A1Mw==",
    "j/ruDMzBYoUfrwUa44Zn7v1CPAFkxQBV+K3gCvw3BePN65kAAEsOQmymarY6o7mbB1Jz9E/TfCKjVVxv0fN8yw==",
    "ulGyqdovJv6B/D7hFSQlWTfsa+xIg160N8WYxVZ04VqlD4iSLedYQzKl5NJHhwkMsU38Or2znFWu327hCPlTVA==",
    "tuMKQBYClIb5IFxdFBNE+IWz3iRo7fsLhwVF8Xdc6CWXwqQEYvOFyVd5DCCCLZ6SDvGuIwh41rI/IhsBgoeczA==",
    "eddgJKMc2+VMqVHSZMRuePb1rF3NAYuviapYYzO+grLVyivGS5nKKpnZWphPLcDWwH58lgWd00a7Mpat46ozwA==",
    "QjZzbQjyYkTnW1FhQJHMLCkH1d0WL4SXsU1Y0NlUp3fIOXVJvuRo8w5IAlLZuJMXXffSv0FaEozMeUB9nV+lNg==",
    "2qKVvu1OLulMJAFbVq9ia08h759E8rPUD8QckJAKa/G0hnxDxXzaVNG2/Uhps/I87V4Lo8BdCxaA307H0HYkAw==",
    "e5roQKq4vuRbA4zjmNFahnnbktC6Rvpn0bgXeYbkHqzekVxlUvwq+GeEJbi+gbV+D37q3Mk7VsWN/Di00zvyXQ==",
    "DvaowZ4ZpGbboxOeKkARdb657gH7Vqj8EaPlOzRfIyeVn22qzwzmEhmH0kkSUdz1UMlfYCb5Oh2WoPQWTLHGQg==",
    "1iIarMiM4U633g8V8iYOv0KU2aw9dbh0Ze96+VcMlZB3hg67xcgVMABQfOHjmu1dAH8ihiEO/9JqEYlm7RXBQw==",
    "yaxFYadQP6uca3HIQ69pEUOFULzfSIHuwY3aBuTYuCDMqVId+p70cpjM9jCP5MTy9eNN/sKst4+9wE0u8KWgng==",
    "c8XViwXh5vzkKZ+NkpRoFBa8N4X1HkAtztwOMMBnHdSDIaAkjMwTOJoBK1JRPxtbv4IOketPYWkoGDSFtPHrIg==",
    "qxclxXQn3fk7NKrGLCbz/x5JytMN1BrntfziOJQkXn6Ing/KXsB28kfcfpKdcvuWW0VojlfYzVQhJxShdIC+Dg==",
    "RW9nV6gvBYkECZa/iPKOYTF8NYE1qatuluIvXKaOKmQ40T0XawEVesof7tzjwabVw6mx1aRxaRkXOS+5TQg09w==",
    "UzAkHm8BpJshqw0Bqcdq1mLpejJb+OJMTrgsbzt9JTit2Y9iMH82+QDzk0hhuA/JhEt2G+FUYKGxAsJs8EEOgw==",
    "2N2mA9whwgpt08ak84DCl2efA10nu6glVNAuH5XsousgSWFk+W3EuEubsJQrlqN5av9hJbuehxHiZ0tEAXbpGg==",
    "geWjr0YN0ogTU9AGrzdHjFiv/xYCJEEib7BEOXg9qSDQn9A+GfRbyC+Cc1+/Ty5fWI8Rr9uHtp25ESPL8F9/Lw==",
    "Ja7PfSQe5U5mjd00VYLbd3+fYxudJDLOTTIRm+o5aNn6PhhLE1Nk32IkerdLp7hqw1QvY9nxhlPYa5tHlEq5ag==",
    "ijcvciqSLinPXLIr2rxtKENk83baNVymW+Ntri+m8DNXRM76kIneVdMxrmTpsvEDfnNgiwO5eHWKIKASkkqyNQ==",
    "1XxUq7h60tUYeQuBIw2jNvVRoNiaV9Cjz+L0rMVbSyECYc0UgrxDb2LT/JbRU2uCouk+mj21zQ8YIu6s8wdGDA==",
    "YJLx528EpZJvb80Umxjcnb6Fgb3m0qFGgUUoBGNHK2NscR/2H1zKhP0vBEaXvR3Rg0Cz7QoTH0u6Nfg5ot2eCw==",
    "BnSjzfX3wYwbdSTIfDYDfz0CZ1EtEeBS9FPbwJfP1SvDMZUIgM+QRlbHB1iy4l4h/ix+BGLoYREqLcnQY2u6/A==",
    "PZTupJxYCu+BaTV2K+BJVZ1tFEDe3hLmoSXxhB//jm+p1xhio+V0a1cb49GHsAQQRvUuvYUMfL1f3o7jhHO2SQ==",
    "MB8c17JbCXrkx5qX6SvONZ0SifZ1Tna3HnYXoG53g6PMMPUpAgm9o+avI50NwPPRzUxehm9MXDIJ6rvXqvuAWA==",
    "qMcRSyksxvRtc4JMsHPK6yPrHtXrs38GSgp2rUUtk20d9BQz/6M3w/fNU/XMAGWO0GMyUrad4ZLmHZ8AKw8TPQ==",
    "0vkgaOB8mtBXJpPPVG/nUHDldIB8AvVIOjG4yyEFylXMaq2q/nSXf1gc6Q9D4qtIJgvX4nPUqDxELsSHHNiKrA==",
    "GkEzzfpsxRg4fTkoFAKXRNb6cRIuvftwBZUSuJRpzbnZteRZAOmeZ9ulS0cIA2KYqUg1dR71gxSfBqsnKyujVQ==",
    "0w3nkLSQVxfJVqlfYNntWUj55Qm6J2B+HFyP/jWs2D9xmuBNYzZMC8tyulKax5wyGt37967PfKPKyECjcub2yw==",
    "ol9dS/+8Xw49XKzDqRhwhm2MLSJXNVbJufoNJOHWjFXrQnJrGJXfjl6HDaM3Vd27rBMK8tlthN0NV3YdJf22Tw==",
    "9EABp00LCHryoUO3eNzewVVLzlmSyWcuPQ9nBNAiyh548IdUNWnLmdJJuCDmgxOKLdxdwXjVhRZ/3SadFzlqiQ==",
    "aS826xFAYP0EzThVUCUlHfmF3faBoGNvvSkO/qb8rFImhZNz8+EOjLB6tTQ1R+sKVDwYQg1wUn0rvZAED42qUg==",
    "Sxzvh1oCViQ5jNBtuHbvmrNP2xtqdaB8y1kdmyDqZuJLrzI5EbXOi2eQSUWjbChjCzYSmTnSPSYhhhDLBJ167Q==",
    "2z6A8RUXq3lyZYKTcfJFp6CjhONqjUPnKFLI1H+M43oXhHXu9Ezove5asFT0fu1QLnbUm59KWqOSB37R5vQ+wQ==",
    "vQhVGup3WZEbN+nUV0ghm0fE7Bei0qMG2bj9+YKp4xBr3BrPP0fTg7bRboWRC7oIEo417leOfFXy6bm1n2ESmA==",
    "O9inCduaTguHSxE1ZLEer4JwrR2jqSNtuxb1j0MoUHA0SWI5TCIxs5F0AZJKP2iBULmp7TtBBUfeP1ZFBzlZLA==",
    "0CBshXcgLGF1krR64XjahnrH2q5OZbkSx3HF+wlYX70Qw2eCBk6DrOdJvicEVQjVRFMrYo9n3wCmt9upd10+Bg==",
    "dFCD5ZlBWKD+5NhJAS9DqCLRnwaK+zJ7Nyp6i/6DR+V53SlCTslTGb91oktNtCgNnBbOv/XZMNYdNJCQYaR4rg==",
    "NSel4eXllT7FfzCcZRPDRAVTFgM3K6Df1XJeaLlRDlCQzGsxey5zWdKr1a3TU64UNbhVNetbC48uCdTdG688iw==",
    "YivkF5FvGw6c6MlSFxsRttLiky1hl8wXQxuf/fA/0K22mwje2uvdD5SBK8LGcMiU1lFlsx0vKHlTLywURT5qDg==",
    "wuva3gNo8d6+RPjht35mvBwl5/D87XeE1hWBHiwBGS28ISU+EHCdC+7nRt5u+Tz2WqObopVR4R9gKt3SexlgGQ==",
    "Ws4GQPDcslhx4ZJflrq0gWLWkroTTJxwUqN/36SJW5CsVsf7Dn+vFV0UekZ4OVANmA6dTtHMlmYRd6zwuo1BZw==",
    "XUNgDATlK/ZSTNy52tibHHVjkS58fiyj00sns8HQfYXTXrt6Za8ENBVa+jECpYCtVXRozCPuoeFRv9TqgX/Fsg==",
    "ONdTisPlHd+2ck9XsppeRtFajAj7KdFfsGgaQxWwP9Z0e4XQ6yueX87HCfNl3gjWGh6zYwlL8pK1FUZx0V1h2g==",
    "Lc4T5YgqMfc5bZcK5y6J+1knDXi/e0V50IVcTouiMdI+VWa3fnnM3BFGdi2qp09J2C+e/A1PyokeePn/hsYTAA==",
    "bXZE21dcXCONoCzEJZmWzxY6OjtezMT8YkQt3wGqBe8MTtvj5tIg3xicmEqlVyakki7+AEgy8tiIfwuKkmfbQA==",
    "aFZkfyacLuPYEo8LJUJ2WdiAZB7zQzAN081GeRaPWNZSf9pwtOvIVOIGXhcrfVjBU2mSwIEFmSWbqEorQMZUFA==",
    "ixKy9v5AClHSllbiuMQqG7/m/PPkJdpDDbBdGi3aFHkN7iD6iyLYdir//kmIpcmKRDDSKhfkHiPZD6Yat1ZxqQ==",
    "ksufLk7uB8ezKwbPSRf75UNl9VJHzJtbxEeNn62lKwfRwwKzlZ0MqadaYpZT6nwkWo+7oqJlzaTqcKxahgpvPQ==",
    "I0F/k8SZ356q8b/WpiqtvHEb/lZoKUPeXZTg2sMvcyt2O+KMMq1fAcuV5bMirv+ElLER182Lq1DnxgJpXqb+Qg==",
    "St+og3u0mWBdOHFvgwX9UCVd6i7Evz7rB1YLPJO143JcWlmCd6MlAs1civbIjVV1besDtpz8J4/+K/s8ogKw9g==",
    "mBokWySREbTNzVZa5gyd62n9tVKxDJMujQY1aFkEIDw3zGXWdCkkBd8kpYloK4qmm9Dhb2ZmUikL15rBDjqbNw==",
    "Fd3x5DSojyfe24Q17YN/5PHzv8W2/Th6mOk9HINJPTJkZ8fFPv7vFY9rnMIIEmfZdhoypQlDmXVMD9YvTHI3Gg==",
    "4IAmh0gw4LkR9cxRuBWZpNwhIE9ck4HLWg2o9FLumdn/dZC3mIBcJ0OCJXLm0uR8LB8tQo7zwo0FKXvtxcrE7w==",
    "ncnFWY5V3EKVVpUyCDl4jjU/HX9rp033TICopS9GPAaX9X9og10UGPTOm2UwzXm9D0xvfhPJP+sSGMC2XCwFYQ==",
    "7kMg668/208sgysTcgDAjiNeD6e70OsXQMcGO6ig0VHad+ADOY4XFKlV1HWwXj6VC2OVA7RS7Bhd5CKbxIc5SQ==",
    "AoVs73Nfms7GueM/D7yPmATSqlQYfzgriuhC5dNpbAdFmq0qWu0l6l4RfrHHujXaanqK3Onmr+Oteen6QtW7qA==",
    "Nx3blu1b5lITeUV66K3XB6hmcytinuAAdJBNc4WPP66CfYTlA/N3kHNJCydOKdZE12FU+rGJRSIiibynmLpkOA==",
    "lqaToiJW05oFloAjGct6+ZfbS/4xFXfjj4Qj3oHFZ6lnddBjRxQ48Jgu+qa3W0qxc9nTs9R2IDC1Ivpw3POyeg==",
    "fYq2FVqzHyl0AELYJ4imnogPxkLmAL7fyJCYudL0+YvBEUH9QghwlYgQKVEA3mb1DJbh5PZInemPm/LUqaoiNw==",
    "zlYfj2ebTusdyX2w9yYyudocW1wCksvwZiytmBN0v4yaC+E1Vlf7GBlvmA5mhdUv5gHdRcaw+956pcnVLn5Zcw==",
    "EBZM/RYsq8RMVtdtNpCW11mVQHSwVH+nMQwziPD7a7KqKV+vHiLETPWZWaN+/jF2mLwpqnGNV+vIMaFBRPTkjw==",
    "ZYszeo+oc8c65NGZkruq0Q4TJa+03ItXM/hwdhQptCQ6eYKrN15SnB++Yzmkj5+56P1qVo+cr+ZA4QK585ijMA==",
    "Tr36DmDho+f++420JKXDpSNl8yXsf1E4mklV7jRTu/yUaS3qw/9qTpQQXCfWMt8mJQ/zcxTIgv3rZdU1NPipYQ==",
    "3+nSprCtXagC1pWzuRdFhSyXsCg9mgM/BNedLK1P3lAEisfYK8+MQCsQnnhdOfyfoCA/fPxiDuQ1d2iLzz5pvw==",
    "8hhp4erDd084eFcK8NualPRkNzwakuCX0YCjMckCihimi/RiTY5iCyIWsDcJ8D+2zRAAT3dDPtYFsPdxFhFFxQ==",
    "8fko0yLmhSMBrW/JAekfIVajzu+iBARN2jtLdqY2ktqsR5/8bYPu474Cih9lHTUgdY3TlaGyUebCYbfM6G0EgQ==",
    "N5VLsRsKqmf4A5c93ScJpzuUfQpf+NxGwtPGkYyHBprQ35B1ifMCapSwceDwAjDwDPdK/oAQwk5InMivm4vWRg==",
    "FA2wS/RqGU5E8H9qzugyZXOqBZH4Nwp53zIAk8RXZKKrrlMeWnQvSWVEZX+t/tt/BNS9dMNHquI3te5ZkhuofQ==",
    "bQ0wvnlrbhA5c5vyTOJtjblU0lgT+Nf3REYXgW+T/HSItxxp2W13xlAH72oroxOuBzkwI5Xz2eqwJE43KrlpYQ==",
    "K5Lg2RW8fVYhVlG8n3aVRMVeKicIDucmqxT6wKQ6xRzTeO6jVt+nDuw8kUbgjpg1jGH/+j1HfMrDX9ZySkTCPA==",
    "LO2edD2E+OxWZKmcbeIjhGTmESmzyFan/SzgixhfTUR6gp8oeHCsVCgRSnI05Bp4gBwZ6lxiRv7/lh3GqbVYNQ==",
    "RGIwPQUscN52KWI0tyv/GvFz57Y9HMDibFGNEDvzunjZr0uogBMZLLra2DgBuPwp0IOKFEqjy3IayFnuq/AZwA==",
    "iA/vebdMEJ8DDz+m/LgtygNFKMymiiPtHuQTPBCz5ENDSjfENvB58/OpIqhUdUmjmFQSByN5FRnbwWaTbCOaow==",
    "Et6ZbJ3OFSyDvmwOacZmM/xCRLQSBmpf586uJ71KEJ/slTMsYOh98IoccU2dLs8oqKgfHN+Ls80s73EBG/Wl3A==",
    "dIQF0Y/AXwr39h4Mzd79gFXYaCYDjHfyqyMPfZfInQ7wnOgsQ1KnSRcpyf1wSyeUSdDdfYbNL6Uus7WlgtwgVw==",
    "dGZTzcRLTIayneWyglS+kZjAJxJJ8GkGFbBfI6wEVt1mzd0T0vIpJN9TDHj9/TaZ444ppVDic5qAP9H/vrKeWQ==",
    "ztCz5AEabaBBXFHjeZbrvFBBhh/RWE49lI4dTb1/hnPvk5EKEHl0kN1cYiRe5+wD186LjDj64h76wa5gVq7RQw==",
    "/Uvn3KxphBlvq6HYjQ/6nzPKop+6s+OM092n+9lIZslE+RtAWz7GEwROSvEb5xh7FdWvtAZ8VPoJIVw7rE/wgA==",
    "RoNtWledUVi59J1uvppDyfSlXHaIacPVQrthX9uuyN00/8xAKIVn+MXpNjhS7/RP7w78CQS+F40/eOobYbnpig==",
    "wFuHRdaLuWR+QR5aofkkwsm5bn3ecdGQo7hwmswoVqv/PC29cJOyX4HGuYg9N35yGWhjL6TVZvf3LhEJve8tdA==",
    "ZHoOFcxLteszM5GcyCjWjFNS8fys5pZPI/zrRtDSQIroltMxmyAuxofz+eVRJsBXBf25Cc2MrIgwSmG2mrz2XA==",
    "LdHDIePPtYwuiD9dw9h/AZNqurPx8nZItq5WMzPjhSvMu8v0giIw6PCg3+MqttjekqK4siceF96+6/ANgwRrdQ==",
    "OBItgySAfiXcinQBLKnAKSIiYEMDzotm1zKf6jlNhbe/vg9laJXr/Sa9YKO1U6bj5AAydhV7MbOkd3nhYz2J2Q==",
    "J/+6XdCUheFBtlniGNKSSrA5IWPN4pbUEJ86782wIkHPCVLwo44mgNXPo1NjORoyThJRm1jATorfDpx6i24XEg==",
    "adpV8727HHOXyzgrfoB19hV5T2+EUzE8CTPTNlajurB8Qv+XeFBiWxHKMCSUSXsO86UfPS7C5K7NJLu8ZhxlEw==",
    "7hJw9v5iI8Ga1IFPBUm1TBGue0Oo80GLD3usQrtbCTAk3U86sMmvX9ICXVDVuNw1Bdj3VPmKwyNzRKfBT6UIFQ==",
    "rY7UjgVjeLGvzcCz1dOTasgl+Wq+CVPpu4WwDsFghKTwvxKisLc/CinsuYQaHcfwA0VgFiA+iRq6G+4T/9Gb8A==",
    "9utpcstfsVb6IKk9hpWuHZ2ou97MrbqBEj5+y+kXWWtR5KbPnhRY2IK3azOuqPMobMfKEIXwnrPbm5JjCVM5pQ==",
    "QMVNRo/nYKcJRya57xKpih8P5ecRITfs+zqI2wSwdY7FgWA+/eNhCx12qoeewxkzy2qvot/FWcWboxQlsJH/sQ==",
    "3QMkxNz/eY8CSjKhMGOgWvZzy1+PA+CKDZMUBshoqGtQcbpxH22oDX/S99PO4bfcEupFah6+TLyyWr+ydJI5Dg==",
    "ryFqcSLSnWp9x7ici0HBEefJoAeB1KhnoddRELSKWpySoV0dwq6rtTuDvP/FD0TP3K4p3JmEyMhP69AYkyK+JQ==",
    "H9luGQWwJNX6iDs792wAoCNe5jhuq65NlgK1xeXqgf46HdDYG/sPkEq9Taf8ce96K70NxqdmkCAhzrA9JXiyBA==",
    "MbdbBHsSFLkV7FaYPihNFMIU1WfxSetGehoyQICqDYAmTtdx4vkRBLJkLpqDEsDAAWUs9OVTCKhwp3rPoIjXwA==",
    "WbjREHjItlxd9POdHFMr25xujy7xIbl9xbvCnK92d0p93Nzg87zP/Ud55X2bIxAu9Za4uUBIAHk1XNz37FLUfA==",
    "PxcCRYun8oRg6EoDK6FgQwEmIhq1MgrgKDh7YKxT3rxC/RaaI3FKrDAJ1Sv5+UhcCHjAapi7QtFWjn0DgjStIw==",
    "yNp6u5PTcM6LpvK1j5GrvxMC+WeZVEzKv1LV0erDMYrU7IU+3JnPht+TQdbXlLV7aM0fvF43wDqhApf5go1dCw==",
    "4WgPrzFZEft1iKovAtX5aj+wL2DcPJMRe5fk8A4s5oYtsGEXpmJ7FLEbnkxhu+7wkTThaEWZo3DGFyGjsIaUKw==",
    "uu5yj9N8vh2rP9WpIuWBEb+6m7R+EHkJ+97syxgS3ifS2HAD/G+fZ5d+1ZLr/HNEcM0ekHhY9VXyHq/W5k8GDQ==",
    "iRr6OPMJTkh7ra66AS8R0xCe8ZuFg5Tuykx/DC6P+7O4inEFx9c+clLme7pRirtqMSp7ihF0LTG/UyZ887CeWw==",
    "bm4745ViJKl/gT3lWzWU7F4vSkO6uHPZAgJWma5Y+0Pbcd4dwVnoP3p+/8GcpaA8Hv/SewJu6aqtktHVgQTT3A==",
    "UfK6MxwkVB7+wELMZjmNOINIxP7cP3ek3f2jl1KuKIDGjgRlwVsHq/2T4WumNa58p9fhRAGK3ldgfehkOZL1Cw==",
    "oaERRJsZjZsfU4utfz/BAis6WxpekKC8hg3oUSdGy8MVmebINN46MjUyevC1H/V796zxl0pzAU2cOVOBLtx8jQ==",
    "xfvXMdGdKuEYDwAb5ywsGquh17CUs3SIgOJFk7jhF6dQ4Rwb2GfML5bazoyLdKvS1cTyNr5ETnfTDRkWF0BwuQ==",
    "YbLnfbaX3+VXH/8+0GvWDEHh57fAioDeAcsWUm2amlLWkN++eSJ4pg9uK0xXqXxyl3PybiWNI5OJDJhdZF9nFQ==",
    "wCzKLui+2bSsdEONTos5YZNHki3aXK0rw+ueTP1Pr3zH659rIezKLFXLYNEexFA5Drz7oYMS5JWY0rxSAg2p9A==",
    "5Sir1sMV6t4JqYHkhh9hSMndTy/ODqVM0+l5bxcDOjdR/poiOqI83g4FGhDCvCfAKYvpfLh8cRBmehFbbTBlfA==",
    "GwvyNgLScqBr7D6G/GdeFt+wZ7KrZiGBMVxFcz0ZETdFS6InE7UUeLCW3FHT/H6XMFBDJGVa6Le9/BhBGJM9Ng==",
    "EtXrwwFsd63NAfHeP3ksQjDeZ8C1AQLgP787a4C/kTy2bD5yUwxkRxkAPbL8sVGWgDgS2Jdh4LeB6K/tcmijXQ==",
    "o1J8TmI0k5QnT7FbML2V+sJ0cuHlIVFHddLmZ6VIDFNn2m7lJqrI0NEibDPtoTWAkck+xrG4Rkc50lrEeV7xdQ==",
    "Q+SXJ5ws6AWQOjO1S3RuqS1gf3xIB5hshJgjuBCXqQmbWJasfMZt86k+3IqRtvOXHWx/Voja9jVzd2C9CA4nsw==",
    "ljZwiWTF/2YAUQMZ4Hvz/Pyx9AWP7CeO+2d5ZLoeFAwWMlBUUvgC6ZvPCdo9RW3Dho0UmgeIpzDknSOc50FRRQ==",
    "1dF/WS1AHLER+nw0z1A1vAjvay4NPmTdqwhDDe78i5wJwg606PmNjrysbwmqLB27fBs7Lv55I3fKZgD3A2Q3AA==",
    "DqBTu+LnImSuT1RRLGIcczEg93fTz4/NinzBq8rs+5vpPughoV0ZRn0kmieWHkdKv8QzuMcTIyEZh4nVwqUIlg==",
    "xkKRwhfjfnVPb1fBMW/NinwqwkJuhnhv+2l5fAZFhIysQd40X/kLcvzekYt8+upNZhaH5vc3oIjpKW7vTDtPMQ==",
    "3vijzUkhEngV9NFlD7+LPvFu9ySjgEUTN0m3NZ+mi94+68nLUZD7ZyDuPSRHMob8BG3gZGxsAELqGWi0j7a/vQ==",
    "bzWB3zCveJ5Ex0WTVuHCSHSbSlo4l1nf83gmvSeNKTuiJku4CKccRT4iopYt0zqcAzOK0GCzeDcT66jMi0Piwg==",
    "JoG/kQ3fpoC3IEA3KU0A0Pyu6Eo3R/bjAqFnBLOwjvvaDlfbuOYekjSMjV/FpZ6rdMd5SadMd0DDBBKp/GW/NA==",
    "6riWdP6qNOJ66+7/PApNcAcLuHLV6fGGzx273uUXtuNXJNYp/wJaWwcYXpEa2n48is+DCqDk9xd3vS1E9QT38A==",
    "Hf/V4623HUXSJFk5ZlUhrgAaMXoDcgpFcyuhkAyjuDUfxcm0ylE+um+AvHsdH9rUq9E0kcuCTWGwjYwOFWGz9w==",
    "HZ2lf7vasJr7NQarLSI9BhCdZcHIrRl/UBOPcUvEw/L+V4eSJjnGgKytHGUflVmQQllUziy6DFzIPyZn2HjrDw==",
    "kCcriSEsgblwCJf2EfE6wdKRwzpDcADBQjM2tNli3TnOI0ExYPAjlj4S9Mz5DSdisxv8aBjvhl6KfL+RipTB2w==",
    "MlY40wyfY9fNuqaJt6+NI4Jr/oWTs2HHBC0yk5JhRsZcLWCS8g21BoJiNZhgs+PVArYDS57I5yU6H75LIAe3fA==",
    "o/7sIMac2vGTZ5WuuQUtxSWib1VZBF/kWNSyRpfiYL2qRb6MlAoGrjn9wfk2XzK6196CT+dyKkRORpx7wZi3wQ==",
    "P4C3v7/J1FBz/cLtk/fBnwHk1Jy5Er0laPJIVh+cntG2diJwAz2fQhyXf4u4tKc/mpnVgMAkXdT2StNdaMmEfg==",
    "wpLvBIRM18Pkd8LC/d70b875fl3qeVX9T0GMe0EUugyiyiMND3Olheqq6pJ31yuD23SsXoh0OaIlwQWwv7WjjQ==",
    "nw3at5htpU5l72tTa7T3v/Ro4PMQgD3ijTkISSND5MqoVbjKx0CeOoko5jucXRyup6QI7QYYCduuGrGme6G5Jg==",
    "xYhn0wnKSK90tNfkns7VFMif1DP53YQvm1D/qmx4EL7zU0jQDSbcvigSK6HOM9TNANCbp2+YKlmLj2V5A2iuWQ==",
    "yLHWtHeJMrwh7du+Tkj3cR1+l+1TVNzxG+mOMRBRD7AHlIwoj9L3qnGy5ByGMw27yi7UctFbREgoxt9CgoFYeQ==",
    "8cDAV8l05MJ+SX7vUqApY9WVfqAsfhz+BkIwSHmar3RHVzKnNSIgqRS/MuumoLb/KMd9Jcw8oa+9qJhw9OtV1w==",
    "CS4SHyx6JiGqNqqbBA7+RDXdZJ4/M2uoJ4jVe5sWQYT1tbpkTbQHa0b/nzprn1jXdc6U/rZIo3LZYEcaZjt04Q==",
    "QGpTgumlY+YP3lzEf1LG24bO4nG9OXSsbidKG4xafrNpqbfNMSwwH4kdTjpgGoC5ygYwPFPKvV07eDTbxRCEcA==",
    "stPvwjkM96EJO5PFK3bQ3XS8J389Z6hfQWNfiekjrryWCyvfihOGDPMIOsP7oT1P5eQm8UT8mIVU6J7XoDJHSA==",
    "8fcQBjau7siuk6LK8fSFLxkuHsGvE2l3ZcrOWPtAudmvw7vn5S7c5kn1PBuvZTyiDnXT5K1UnQXrM6aN0R4YmA==",
    "22BEFt/Qp9xQnb0sg9X+3l4x1kHubBQ5DPWZzcfYQWYKxwDT3kvjXgcAa3JLfdG6oh78PKbTRrO4WDhP9pH5Ew==",
    "h64A5JZklRHDv5R6ZYBa210jeuhIbL/wHr5S1dUGKpnbNDTsIqN9/bTLoaWa8fpYJe49sqhSS96uB/MmSYm4Wg==",
    "9EK7aX1JjyAm+ipf//msWsoAUvbSAOEIBRBNkb38caN2TOAncAkim558lFIivXyQhRY5h+TO0CrMdCCpaw+Vhw==",
    "EGFYiHeQnKq/o31JFe69blF7jT79VmD4cgGQULPBRl8R/JtE5yYQIZ8/XyF3KTPxAdnVi1xfef10V/lXSb8R1Q==",
    "+7TJvWghoEzxVNzHp1B6LGVXOfNja2noGDQY4sM9lR3mv98sPKYDaUxE3kQFdmXqSDUoGidzy4qEllvgLfHz4g==",
    "CNVLBfkB/pXqW1a6Gd+RIMZq0AT5i/j8vanaCHTmSXjvw0h3uCJKAk3hLXuSa12DBo6KcE7vD3OKUGHl+EYvVA==",
    "t59TpRF1A7WgMW+AG41EgHnzjLkMw5uv1N/haePJMdYir34mg1ya1NslwNamhOfaxLiLR1Zj4FYBqZ7p/Iki7A==",
    "IgnPa6Q/YdfleWUeu6CJBoapzcHgRSVUlNsLxzLJUSrL9yFY1XOP9jtQCq3MugANJaUh1Bq07m2S046Ad7ecBw==",
    "gjb3z/potJvlw4p6G7Z7dFQw0VEaCO80c4PDKq4e9Ksuf2OiDJ2OXPIZizK3vHm0cNNr3xLnJj1mn6SrhgW3Xw==",
    "Iovv5XiAkAZtSTz4f3XGZrw8deC3vGPoDTg0DPkXYlHG4YWZKyRNSlsc7PpCEo2ubsPtU1r/A5dp42QEjEQtzw==",
    "WRcdSYv4BzHi410KMto1ZBnmm4uqWxGV1pDNilsRVCCHoAfY3j/QAL+wOgQIwI6SoMdxKSQ3P9Z6ZSGOSk4PaA==",
    "T5So9qE25JBpyI396pNhs01o/8JXJPg2zLAhvbdOCu6d3+gLk4pcErAfDxzEnFAP53CcIJD4CdngJW/JPZMSLw==",
    "3l4Xpmj3WGYmK7sgicndhndRAMd5dBYd9GvgKpV4hV58gcdyYxBcRz/RotVUgwY5cMD2Q8slqktKtFpAiI9h+w==",
    "MxQAHIJd/SzRzgjHRvC+XEUQJ/D6pAFDGshPrqUVU+/Z4GRvt+m5TLxnLcmP6YcEZ8F2qmSOxyv2EzSxPkeeTg==",
    "PugLFCLjVytG985YQZmL0rbfO1kfteRoUbTVS/VyoX21ljoE7Gq5i6B8lDR1rAiLTSAa/WhPMPRcgDdACnyVEA==",
    "N0P+GL1q7zaIfqt768421dO2nfwwa1ix6MYkHoGp04QlupkaKcOwfU9LnFzHYrJWPJ5aBbGZzqWDPZ+gBi0WGg==",
    "f59xsIbMbWtjBSdnzNbQNJwHYon2NIMkHOEFB2t1SbMYeJfUXXtfshR+VPBWUwNHofkmXm83lTtZQScqKeL6xg==",
    "4Jy7/T3bskdVy+jlHIv/G/825XHucubJndptUHr+PFYtQ36GErUIWa1c1ghCTb5iXgFi5st7g48g57L5P0DtkQ==",
    "Li+RvV/rXHnpjtl8UT4X0tl7AqhEeAoBkCZHc8MECizwf8sOZCS3oOiMIhujgkwZBvwWR6tA3BPi0MxQfLtrzg==",
    "jU6H9ms0GBBc1Vg6kqLS6+iCTh+RUMuHL9PanJPTgsCAZcgY4a+bJYdbFC5wZ22aUl2QHqIULkLYE6Ih0h6u9Q==",
    "BRjkILtWgLdDZ/jPz33TLzquAJoAZ/7CJFbOrQgyvcKmDYqnsKL9y5BywPEXF3K7ZlwLKM0YRgn2OtU/iVl/nA==",
    "JHGX+8vud7jq9jWPcaSdeEy0P7RNmZELBZnmmynjHEAZ6DDzItWnEXqZa9tNkeXPMj2zVOkC5NrugFez947Vtw==",
    "NafYBq8MgWfRUFsl7bVl6TGGTEU79grXtmlQNddYTncU4h83ezWl86aYeINWF7lRl3wgn188WWe33Zvqp1p8qw==",
    "yptg6o2i0Lv0Z0LjGuiC9TVWiLBxiD9pCud1xNlJ3tgHcXDybomhjPwlFmLqjR/0P1pfKOP7Qa3XQa0uKDQaeQ==",
    "qGHcZMdFsPXT77J3PFGYGoNgJLxCCx/MVk4DAGFjtJESathjP62238slwu+S/YKCP+LH8RYaeMd2a14h+WusuA==",
    "HubKCGbyJ7J2eDJv7aTL9Zk0qw6i6HTp6iM6pcZxQaBcG0yVAES7bJudFGUgwuN3muRBh74NwcxB+n9yUAskng==",
    "2hAyBXol2n75h6LXzyi5J9Pb2VaXlnn1pr9Oog/hCAvYry3IscfiNudgG9gs/WTfyn0DoDCHR1rdV+rf/sLKhQ==",
    "IuQTJUdMfH7pgDFNdziUfpzjqXCy0ovNadVF1eeV7VCloYOQIWRdAAzUd54YGmWXQXHBW5sIs0kgW4fBUGiIOQ==",
    "X8WtG4t2IsTRfM4jZ5/H4MzroAwf1xeCRSBvhmprsZjyagWj1CnixQjarG0PaY+ubA3n/5cerO7oSBMRBnLzqw==",
    "ImT2dK/JdDpGGAzk5KpqK7M9a/L2KqFGSBeUAIBtcY3uj+V9pI2I311XtCCHuy+mL4M7/4e2Z4YGxjNsvPNLPw==",
    "ZenRGHgBx0/CPE8ZaY9rk0BcaBuTqA0j1CfZ8sv+Y/filZsqrWzX726Yel/9WF4b6OMUodUC+ugCFcUzH4/8Kw==",
    "4ENrF8K7CWsIaY9MtEgofWkyLDSBR3bgsbIUhqLVtpBoiaWxmP3faZqyhb31h4PeeRMHX4atqXfdNf0JrzNuIQ==",
    "hXvmSFcitL5EW3LHoVodC+5sf7KtVBwrTwA136HuqhDU8LpaEk+YXe+lPQoFVLsliygyvCy1t3h9gS6WpVqT3A==",
    "eyKYZUuVzQAwfY2YOgB5zM/YnleIGAyvNStsllubtRU8neJcSgy7XleIWWYGlsiHKA6jeKLgK3x/nmzGNVCevQ==",
    "x63sySjvBlwmOpeic86MswSFv8A18vwCx4rirGt/ftIOk4l8CZTKuNWE7vndR1qhYTFZoMhi/xecZxIPa0xyxw==",
    "BBoDzOZpZlPtXzZ3Sa4a88JlToqcDnDkZyYeYAI4dscnHK5UXRFMMtONp1OJUlzwzx/A+ppIHs9D+gsfYbho9w==",
    "5lLkqI7BqcRnj4z9v7HXWHdGACVRZeK03BX2HBi5reFMWs5+iuctMGK38Xh1g8VbFLNH9kI0TnHW4A/W9MVoCA==",
    "kDZ1/Yxwvr6f0NrasXpjii3YCJrmMRTjbSj0x12VHXWwvKtSR4A1UYYnIHE6tFqTLb4UHkjpvz7Z52IBV33dQw==",
    "bmEBbUdNKsKYTk6tRO2CtxKbC3/wuar19FymiwUppza4RmJs68q55843TXROegnFG7vHRtmJgG8aAHA6ACVC+g==",
    "IAhdRxeiBOiW8Qxffh/UKcmvhI//YIosRtNzjuT/uUQ4GICnpFX+xqGiF1TZ7M8/E5DqIuwX/P7OK4bjYXhARQ==",
    "NyFsoGklm6MkTeOTOjrV81cS8Kt7nIHWQADwuR3UIytTdItwTn7Q3Wgqd9hLrBuUPS/3o9v1/jPfRV3bENEWMg==",
    "HyRnpXAG2W/cdai9r5iQeucq0zDAQYsGUTwz2G3bgAq2pRc42/3xxEZ2A4wJTrXzCbW1kOqq2k2wn+dZD/BIiA==",
    "xFiT+SrD46o7yGqe1ll5enx9uUmmZVKr0EbaKqfanlL/i6JnPLRLLLBIHVmexwAgttUHkpbywZ2xYtyMzWS6/Q==",
    "mRlXSt6bhkC7DvRfmNHbb7ckLEM9hs9tS9Z60U/xXXShP3lkKeMSusWBVS5ll7rSeS8xskiO0wDGEYiRre6fsQ==",
    "A0qS0AoXKl8M5xf8OKuNaAGfUASTiZQBtWOEXrYEq+CQd0mqgw+RtTqnyJ3/+GZk+LEjr/RyHXkKWMwi82pWDA==",
    "VHFOaYWcYLB8f+NIWchVo3qCIE1yPxppX3jXdlzpBtEJ+mFE66nn56fYNDqZSV5y0WDdRovvt5TZdlm44tjxzg==",
    "1spHb35oCV3870M4vWRm/KkN94oX3p4pER1GRbDaoMbpjxVsDr+RNLwo754Opn5tg5An3VywhOnrqJndNBPiIg==",
    "huuMAm1r8JBjbwH2I82YuWDQjlIeRGl/NkvBrhZVua1vw+o4ySmsmiRNGOaXNCWU8+ff5gWVRXmuQELKaeZaww==",
    "H2PuYV6bgJ42Ycd7UCnHipLcS+PMTf2Lvnjce32ZC8cXI4AElpqLhUy6BLTZswqhoZZCZMR/I9m830XHT//ZGA==",
    "A1H0dccR0Gi+ewOV1lNDteJJ/qo8PztrhxAMUDBu8DQPYO82Iz8OYocFfve+hjS/xNRrSeSo8sxIOfQvSGoW+w==",
    "FmRfnAq72mArdDbeOxxVqv0ehEBX1R74CpbLwvr/bjsnBrRQackKUtd54QF5Pq9MmuhcrQpaOUFk8L80wYmioA==",
    "gh5GGZ9P69nBGNSbHOn/6VMRPrbk4z2p45xnY5mgs/eSwpkKn3XXKeWO91CFfAczZSZjHLql7gZDaZyOe37qEw==",
    "ZMuDq/K7CpRFHyucPt125KFfnR+e4ywGB/XglRCEN35ISoJZs8ZEKCkzlveOZnTMPAJ87RvhL1Zx0yjRMXQHcA==",
    "zMGmgRTfVL9GfsScsVzjgeun5v8GqT78iPRC+KNYJ9XcZJSk856EIxZ8wcMmmj7mrmiCX+Pi5A6vt1yNh4/4iw==",
    "lNOGk/GxqPEBNURBnFs7oM15tyR4qRzzrTJeTDzc4JKrZnVyIzpPjf8TJAGWi8dMVTru6W1TDKTl9tQn+dLEIg==",
    "6wgOJW+ppdUcPfV3UJuHdWOVhwTA8dtkX3XOJABdOxJQO9wm/Tpm6PaILTSRQopJMu7W9fWFMv6vUhul/gW3DA==",
    "mkPX0MQte1QJljM5ydmAW6We2KY9sUQWWjx1nrn111bmKIMI3S/kYMxQ3ibhocF0eqFl/myKH9Ww98sTc+KMrA==",
    "mGBY6YleLCq4+ejL34AdsSpEhCpWqR1aToex/Jiyk3IsRmQULkLDxVH/iYZGJozZK4TtIwuMlL7XeY1PJ810ZQ==",
    "n8zE7vdXGivu4GmBhWIoztrzvUEud39K6FJLgcNz/bwhB5XB54jucIG6Quw/r6zPLzhqkJascZ5lZbTjhOOQ4g==",
    "5Oi/C/QCSSNvuIxELmZo4wZ+1gARiQU6OoHrdVeYkRJY4lys9ygoEd1eUUeBGETEtb9S/CSmhivK+UB/LjjvXQ==",
    "MX7O1wMETBvOlE3acRTdHjYkTfalM3kPqtvQuN3xrA0Zi1k/BHmgOBmPS5SqbtKUFo/g7oAMAudp7njtRSSZRQ==",
    "9foe3eNZFzBn5GMQf83wDvIny7oOxeoC67q+LHmxLnk7mP06kKcrwmJA2ZT1Pe1l/iLG/ofq/QG4R40ehWmogg==",
    "YyPiqOOAzoZDPVuPzF4C+rpO1/nOW9GU98v6NvZYRLYae9+PExy0soxWrP25nNhIMFV8Vx/TaWULRgg3a75P3A==",
    "3GvbadHGER4oD5k2NbtZzW57GJFm3lk7ceGUxfIY1nsA6+DQKOlEl21lON5BDE2GorbycruU/6WQIIxkT5kkDw==",
    "JChZDSBDY0+xAmhDXqkKvQgtRTF9LFTQZVKfFeGAQ4qxj+TMyRKVhIBOsE6hz/ZG+ogYeFILwBr/OSttfZwDaQ==",
    "Gik0G+9nnlNRkRgJ2hkLq45mWpN1vC1Hd0IXanCmvorOSjVkW/jbl6ubuvHwMTAEr4tM8QrbJqwBmKsdRdBcRg==",
    "DvT887IBCSHFgFayujZ7TAn1Ml5q6a1zKrJ3KB1Lp5eoR7HGp02BUj3qFjqw5Vb7UQLBTozZSvusCrCpIb8aJQ==",
    "c8Za8qU+iGC+5jrwvYpFewrI08XSQ/uxvD1nYkcnzBdfPKEzsmNCw0Adddzd2tmmktmisSZOkM/9S7nm53XeFQ==",
    "GNPeBJOW4upUHhXDHA7w4L2QzMbKNWY4VrlPbxgWDWFmZ8VfOtwbM+dJ9gvlBRSk875Iq+Lhj8oQ+F7QJmly1Q==",
    "NN7UXtJv4iTgxaZqGTwRoswHhuYdQhA0s7sWF1AZyVRT8gvehl3urFwrtchlRGQUgrUcTmHZ3azCONBQz8NXdg==",
    "Al0hG1WXS68IaxOdj6Gup1tifOGriU1S+HaYdFV75ZRNJ/1Lo2BiZrx/UNFzRDbFPUVVodLeDdKsUdfy+jc4Zw==",
    "CM1SGx8TRA1XAB8wvaACn9iqF/8mr+zvost+4YEvx5ppSs0L2pgYQVS3L7fOMF/0iX9GbLs5crSGP8iLPaUsKA==",
    "ujv0ZAcb3xJANM0SJFHTN0qs+7yRbIWLk+GRAGI19NdBVkuh3nA3ImnBItNgEh3T1CeFO6dsa0ULtG9BVup1JA==",
    "ywsyUGObTtlHvgyD7vZ9Nw3narkB9gf2j78b+K2hWYTdp77KpNf91V+/5Hnu4/Xsyc2nuu3J23013CJ0EdzyDg==",
    "ivpAJL2WvVAyOv3Pkqfz57+0yScQjPgcAf03j2HFXYUAINvriMZSi4/BQcN+pIUkgcFJAoeK/eUafx6hYS0DJA==",
    "JwVyae63MzOhqAWdbJ1v1ayJ7CZQD2+YOMrOwg6T8XE89VaeggvYCWlUfXflarDL9X8DGC70Wsi93hFEcMbd6g==",
    "x5w9SkYIx8tKPQwUsoy7ljZPRN2GUfNtkIrlAuVHrXrV38ENomyibG2eUc1A9tfxvqCgM1iWfYZ6lzM9qK3zrw==",
    "ncOx7xHYX/ilczD9+R1bWrFC+4mnLYgNrkduAgdVwvO0yljJ7TYjnogHwFm9Zvgm7FF7ekQYfnIW5ItoO1Zwdg==",
    "0RqX+3uWfpDC0570Lr5JMnzVjqaXfIQnWwFpjjIt2XAkpA/D7t2WIHMQcI9zfoG3llmmxyAulr56o00Y1AJvYw==",
    "yb1iwPzkdzatzZJ1tGhF5OyiO3NnhpP+uOIZCeuEBdSwV68q/9fmZ+BHoH5qzK3CpY1zYMF2iXadsAnwp3lVYA==",
    "f6/mq+fLjBCbGKFLxPwuT/6t1VpDrn38WNibnM67RGf+TMFj/26xbIxxuO/xLniR0R09osbfqBUt7FKyMiZ7aw==",
    "rsN7KhFXcIFCvaz+d+UgQXT1OdhqEnMLvvY4b8oJiv8qXDHqGrIdO0U3Ux3esnyp2uoi9cyMmVay8llfU7uTHA==",
    "awBcySPZr/VjNM/HpePs1w6XxCR+s3KjGA59xb6+Z25y4v36y3Qne3DhXYcYGWJvRmYShdsEs/glxJ7vQjkbXg==",
    "UJtcmTzfYfj1B6hLvX1terCQlwknQABD055fR9wjrCifW7+dMkbtsXTZxdcrp6Bm3BMXHsFf+VCJEUZPhzDTlQ==",
    "AKBTAsOmDljExShH9HN5ISqRgGCTGnK8Zg2I579Vmd9sON6SRStII7RyW6Pu6GYjXM9NWQPpFxTKojDG1u6+RQ==",
    "xPpe+qMcogWnMvzV3r7VPAmk8wxb2a3yf4wdzUsnMJJbtq8Xbi5oCyvjJffd77ye5sHLxPBCaty1y/GNFDfubA==",
    "0SUAa4EH+mPDdaeaqg6+ggFzcrfMZcMVfOB43b2u6MVpu4T9hJDy1m0V/nPGiBJFdhqysdTwVmN+ynBkF0XNpA==",
    "AcfQmNzk5App3hRoJYf/KkC6+YM73MZBOrVNsOZCYvKQ1YTNWyHGVYaCxQ4eJ79ToYoW1yq96HjDUiFWyfBN4w==",
    "6GPaUcrglQD1ib4Fyq1XiFh+IBeQdETXb1R9bzBjKsZY7rhYVzO7uBXS4Z6gRjae07gap3P7/6wxYWI4ngFacQ==",
    "/YIy97eb35zFL/DV3hxWXp1lm/GXaQloldGCqIAowc23OH3SQBKKfs/ScI66fp48Z21uKgNuG5k5QPXM3xpzag==",
    "O/hXLNx7glzn8yIqPbh/HFL70agim5V6z+8gR8VgVnSDxHlgOjwLDxst0mW+wlfRoyxlFQjXpN9QG8AVZX3KwA==",
    "I/xTCwMRNqF7iy/LVQRt5ycTEu4+d4UfvbBfeKKUgVyyFpB5Fo4HZHor1dBcG8Kx7xtkuSnaofnOcj1EjJNv7A==",
    "g9EAV8f7SU+q0om0/l8JPbKgx9eaKYFz2nNc1QYyMr+eUyentKp5XJnzIwRXkLVUR283650E/j30DAR+QROnIA==",
    "CqIB7fQST0IdRRVVShpkLjudGMcOCeg6iG1vDKsHUNm6H/65xYfzrKsNi5wdg9eJEC8OKmz/iFxQ9IWSnfRgLQ==",
    "uFzFKYF1FRO5F/WDBa/93H2QHLO7HRv12rBY3sm4zc0trlQ9c+xq4IicnXhfkXjSBwWdmU4cgHBusormWqoQDA==",
    "Bo/tcuVURK4Qju+91ZqW2krqPYGmZCdCw4u9Tqrtpu4h+4cCwvlRUvH5l6X0DwbFRhlIHy7DQ60zQAkT1v20+w==",
    "y0x/1SJ1bVeBrTpPWQodhikGuWDncgE2yz+za1Y8qh6laJE0KR+nnIDMwrQJK0HfMuvcs22+edtINEAijBYiqA==",
    "bEhGbJ9sB+Srdixpa37rNc/iNvynNoPl+rhzrDSJtNLrPXr8zn6BZdu/N63tO1sMiJwLfg8XkKgzDYZ3Qp2RpQ==",
    "T2Y0hO/KdY1nAUd1il1Nnlkz/iLAodwB+VRzj/gxCmUVs+xCCURJB17WeMVe4AGk+5GxCB365quDhgt7TMe0qw==",
    "gacEBIV0IGONcmcqLfWknVK5+fOLOF2MUSnWorgqaCz+r+ZQkmbksA9ragc0HC9k5NTyFSWD7RQ+Pc+xTBwhbw==",
    "MfZVoTNOGkVYTxKiLgOwnjxp7Q4dD9VzrQ1W+choYimeMzq+eFkOl+6qXC+xTcnzT+9t2vbnqb+/aMpmMRlc5Q==",
    "tixRAvl+XE11VHkKTPU6WNPvRMgxQtbgCb0fb8jzoZqhuJ2o3ZvRMQgnpb9mK+fKx1DEjm7ZExPpQNfZ5eucIg==",
    "OAAjwLrEyVJP9neL6AzfGV42/PRg6M8b8E5cL+COOMNfGD+83Dcm/yZCPzUcUHJ59iWPIxnqFAO2yKPcs4Ssfw==",
    "Rz/BZ8fEvECxfaA57gn/PeiEh5VX5AxSwZgaxBnOAhoJC7rgFIItBXFAdwCJiNdP8VHJJ6pD6IzWP/LM0gEq9A==",
    "AGCG5hlZsdZscudUQn6tXh1sAthAn1wysvWuRI9UaCtQShq8A0bM85v2aox7aQgeiGtHp9CwIpFGI5HJU1HuQA==",
    "OCiy7VSM/Qt0uzSh/q4DDiZyIhmNfjh+f+PtUDkFol1MMwGppH54Ny9oWwWEcGJHbFB3CM3XVYCttXnkzceaoA==",
    "wmp9W7ED7f6uLxIBvliqwSf2muN42wQVYHTpkXRdSqWqs7oGRAff2o005XO37B+fN87wGtwX+vOTwmKgnyxHNg==",
    "3PgjBxlQNaZoCXUU/xoQ4L8OgCtJRacC0uF69t4dPZuklhbf0W2AIFS1IZyjeIQ4XoenE7TvXH/LaWYcf1bV4w==",
    "RgSeoN+lxJQp4VYmr0ryzgqd0vMIuZum5uPzCIJQoUaHD9C1MijVofG/mFlIDht6PT2hgK701dQb0pUcThlCbA==",
    "wKH7bAploNGvRqX+hsiojoqG+D42MX9DVUKSfJjnSDPIh8o6teeSzl4+IcxsavQ3NJ9aZvr8TaeXQkkcZDkB+Q==",
    "3N0gzUe3x9AR6d94VbCDNr1QB8RDUgi9O5FNflA7g5kWShVWl+aKG4igYAvc+EehFNmPt3PIH+yBe5IFemmYqQ==",
    "4toHZE2qc7ZsG2+82uf/KOO5Ak8LxUCP4CwY43RM+b1t1U6nv6H286gchWD7k4/f+aOKKYU6OoGbWNECE6KQ7A==",
    "FQJcnRNYYf9aVJ3wv9bDmP0SZhNJbU6XYnZR5ot7H4BAfxh9eXhGTw94v+6nh2APquu+mR7dtgZxzQzodPCnRA=="
];

// Test input is [ 0, 1, 2, ..., 255 ].
const input = new Uint8Array(256);
for (let i = 0; i < input.length; i++) {
    input[i] = i & 0xff;
}

describe("sha512.SHA512", () => {
    it("should produce correct hashes for test vectors", () => {
        for (let i = 0; i < input.length; i++) {
            let h = new SHA512();
            h.update(input.subarray(0, i));
            expect(encode(h.digest())).toBe(vectors[i]);
        }
    });

    it("should correctly update multiple times", () => {
        const h1 = new SHA512();
        h1.update(input.subarray(0, 1));
        h1.update(input.subarray(1, 120));
        h1.update(input.subarray(120, 256));
        const h2 = new SHA512();
        h2.update(input.subarray(0, 256));
        expect(encode(h1.digest())).toBe(encode(h2.digest()));
    });

    it("should return the same digest after finalizing", () => {
        let h = new SHA512();
        h.update(input);
        let d1 = h.digest();
        let d2 = h.digest();
        expect(encode(d1)).toBe(encode(d2));
    });

    it("should throw when updating finalized instance", () => {
        let h = new SHA512();
        h.update(input);
        h.digest();
        expect(() => h.update(input)).toThrow();
    });

    it("should reset instance", () => {
        let h = new SHA512();
        h.update(input);
        let d1 = h.digest();
        h.reset();
        h.update(input);
        let d2 = h.digest();
        expect(encode(d1)).toBe(encode(d2));
    });

    it("should return 64-byte digest", () => {
        let h = new SHA512();
        h.update(input);
        expect(h.digest().length).toBe(64);
    });

    it("should correctly hash 3 GiB", () => {
       const h = new SHA512();
       const buf = new Uint8Array(256 * 1024 * 1024); // 256 MiB
       for (let i = 0; i < buf.length; i++) {
           buf[i] = i & 0xff;
       }
       for (let i = 0; i < 12; i++) { // 3 GiB
           buf[0] = i & 0xff;
           h.update(buf);
       }
       expect(encode(h.digest())).toBe("UejeHARrYmiULwwX7A4tSUEkMi8jMl+5xq2AYOMlmK2gs9hYtpRvnD7LLNfxnLl8c8gfSFSeJ2NVjrladi/q7g==");
    });

});

describe("sha512.hash", () => {
    it("should produce correct hashes for test vectors", () => {
        for (let i = 0; i < input.length; i++) {
            const digest = hash(input.subarray(0, i));
            expect(encode(digest)).toBe(vectors[i]);
        }
    });
});
