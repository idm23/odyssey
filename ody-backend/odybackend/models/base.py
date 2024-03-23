"""File defining base class
"""
# ======== standard imports ========
# ==================================

# ======= third party imports ======
# ==================================

# ======= SQLAlchemy imports =======
from sqlalchemy.orm import DeclarativeBase
# ==================================

# ========= program imports ========
# =================================

class Base(DeclarativeBase):

    def params2str(self, basedict:dict[str, str], nesteddict:dict[str, str]):
        baselist = []
        for name, val in basedict.items():
            baselist.append(str(name) + ': '+ str(val))
        basestr = ', '.join(baselist)
        nestedlist = []
        for name, val in nesteddict.items():
            nestedlist.append(str(name)+':\n\t'+str(val).replace('\t', '\t\t'))
        if len(nestedlist) > 0:
            basestr += '\n'
        return basestr+'\n'.join(nestedlist)

    def __dictrepr__(self) -> tuple[dict[str, str], dict[str,str]]:
        raise NotImplementedError()

    def __repr__(self):
        basedict, nesteddict = self.__dictrepr__()
        return super().__repr__() + '\n' + self.params2str(basedict, nesteddict)