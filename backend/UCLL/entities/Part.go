package entities

import (
	"encoding/json"
	"fmt"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"strings"
)

//Part entity
type Part struct {
	Id            string
	Manufacturer  string
	Parts         []string
	Specification string
	Notes         string
}

type Parts []Part

func (p *Part) CreatePart(stub shim.ChaincodeStubInterface, args []string, partIds []string) error {
	p.Id = args[0]
	p.Manufacturer = args[1]
	p.Parts = partIds
	p.Specification = args[2]
	p.Notes = args[3]

	cJsonIndent, _ := json.MarshalIndent(p, "", " ")
	fmt.Println("CreatePart:", string(cJsonIndent))
	err := stub.PutState(p.Id, cJsonIndent)
	if err != nil {
		return err
	}
	//Update Part index
	idxPartsByte, _ := stub.GetState("idx_Parts")
	if idxPartsByte == nil {
		err := stub.PutState("idx_Parts", []byte(args[0]))
		if err != nil {
			return err
		}
		return nil
	} else {
		idxPartsByte = []byte(string(idxPartsByte) + "," + args[0])
		err := stub.PutState("idx_Parts", idxPartsByte)
		if err != nil {
			return err
		}
		return nil
	}
	return nil
}

//Get a Part based on its ID
func (p *Part) GetPart(stub shim.ChaincodeStubInterface, Id string) ([]byte, error) {
	cJsonIndent, err := stub.GetState(Id)
	if err != nil {
		return nil, err
	}
	if cJsonIndent == nil {
		cJsonIndent = []byte("{\"Error\":\"Part with id" + Id + " not found\"}")
	}
	fmt.Println("GetPartJSON returned:", string(cJsonIndent))
	return cJsonIndent, nil
}

//List all Parts in the database
func (ps *Parts) ListParts(stub shim.ChaincodeStubInterface) ([]byte, error) {
	idxPartsByte, _ := stub.GetState("idx_Parts")
	fmt.Println(idxPartsByte)
	PartIDs := strings.Split(string(idxPartsByte), ",")
	fmt.Println(PartIDs)
	PartList := "{\"Parts\":"
	for i, PartID := range PartIDs {
		if i != 0 {
			PartList = PartList + ","
		}
		cJsonIndent, _ := stub.GetState(PartID)
		PartList = PartList + string(cJsonIndent)
		fmt.Println(PartList)
	}
	PartList = PartList + "\n}"
	return []byte(PartList), nil
}

// //Update a Part in the database
// func (p *Part) UpdatePart(stub shim.ChaincodeStubInterface, partId string, part Part) ([]byte, error) {

// }

//Load Parts sample data
// func (cs *Parts) LoadSample(stub shim.ChaincodeStubInterface) string {
// 	var c Part
// 	argslist := make([][]string, 6)
// 	argslist[0] = []string{"0001", "Renault", "Spec", "Notes"}

// 	for _, args := range argslist {
// 		c.CreatePart(stub, args, nil)
// 	}
// 	return "Load Part samples: 6 inserted"
// }
