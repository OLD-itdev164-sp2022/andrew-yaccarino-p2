# andrew-yaccarino-p2

## Language Notes
### Quirks
Numbers not between 0-255 will be mapped into the bounds automatically
Registers accessable to the user are: A, B, C, D
Hidden registers are: F, SP, PC, OC
Conditionals could be used some times: C, Z, NC, NZ (Carry, Zero, No Carry, No Zero)
### Input
A register is put in as text and MUST be capitalized - A, B, C, D
A regaddress is put in like a register, just in a bracket - \[A\], \[B\], \[C\], \[D\]
An address is put in like a regaddress, just with a number - \[123\]
A number is entered in like a number, but could be in hexadecimal, octal, or decimal - 0xFF, 0o77, 123
A conditional is entered like a register and MUST be capitalized - C, Z, NC, NZ

## Instructions
### System
NOP
HALT
### LOAD x to y
LD (register), (address)
LD (regaddress), (address)
LD (address), (address)
LD (address), (regaddress)
LD (register), (number)
LD (regaddress), (number)
LD (register), (regaddress) -- the two register can NOT be the same
LD (regaddress), (register) -- the two register can NOT be the same
LD (register), (register)   -- the two register can NOT be the same
### JUMP to x
JP (address)
JP (regaddress)
### JUMP to x WHEN zero
JZ (address)
JZ (regaddress)
### JUMP to x ON carry
JC (address)
JC (regaddress)
### CALL x
CALL (address)
### CALL x WHEN IN STATE
CALL (address) (Z or C)
### RETURN
RET
### RETURN WHEN IN STATE
RET (Z or NZ or C or NC)
### STACK
PUSH (address)
PUSH (number)
PUSH (register)
PUSH (regaddress) -- may get removed
POP (register)
### BITWISE (all are applyed to A register EXCEPT NOT)
AND (address)
AND (number)
AND (regaddress) -- except A
AND (register)   -- except A
OR (address)
OR (number)
OR (regaddress)  -- except A
OR (register)    -- except A
XOR (address)
XOR (number)
XOR (regaddress) -- except A
XOR (register)   -- except A
NOT (register)   -- takes all registers and inverts the one given
### COMPARE
CMP (register), (address)
CMP (register), (number)
CMP (register), (regaddress) -- the two register can NOT be the same
CMP (register), (register)   -- the two register can NOT be the same
### MATH
INC (address)
INC (regaddress)
INC (register)
DEC (address)
DEC (regaddress)
DEC (register)
ADD (register), (address)
ADD (register), (number)
ADD (register), (regaddress) -- the two register can NOT be the same
ADD (register), (register)   -- the two register can NOT be the same
SUB (register), (address)
SUB (register), (number)
SUB (register), (regaddress) -- the two register can NOT be the same
SUB (register), (register)   -- the two register can NOT be the same
### Extra Instructions
BIT (number)                 -- number MUST be between 0-7
SWAP (register)
### Display
OUT
DEL