import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { urlBase } from '../config'
import { NumericFormat } from 'react-number-format'

export default function AgregarEmpleados() {
    const [nombre, setNombre] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [sueldo, setSueldo] = useState('')
    const [enviando, setEnviando] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const nombreOk = nombre.trim()
        const deptoOk = departamento.trim()
        const sueldoOk = Number(sueldo) || 0

        if (!nombreOk || !deptoOk || sueldoOk <= 0) {
            setError('Completa nombre, departamento y sueldo mayor a 0.')
            return
        }
        try {
            setEnviando(true)
            // El backend genera un idEmpleado; enviamos solo los campos del alta
            await axios.post(urlBase, {
                nombre: nombreOk,
                departamento: deptoOk,
                sueldo: sueldoOk
            })
            navigate('/') // vuelve al listado
        } catch {
            setError('No se pudo guardar el empleado.')    
        } finally {
            setEnviando(false)
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <strong>Agregar Empleado</strong>
            </div>
            <div className="card-body">
                {error && <div className="alert alert-danger mb-3">{error}</div>}

                <form onSubmit={onSubmit} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Nombre</label>
                        <input
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Nombre completo"
                        />
                    </div> 

                    <div className="col-md-6">
                        <label className="form-label">Departamento</label>
                        <input
                            className="form-control"
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}
                            placeholder="Área o departamento"
                        />
                    </div> 

                    <div className="col-md-6">
                        <label className="form-label">Sueldo</label>
                        <NumericFormat
                            className="form-control"
                            value={sueldo}
                            thousandSeparator=","
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale
                            allowNegative={false}
                            prefix="$"
                            onValueChange={({ floatValue }) => setSueldo(floatValue ?? 0)}
                            placeholder="Sueldo mensual"
                        />
                    </div> 

                    <div className="col-12">
                        <button type="submit" className="btn btn-success" disabled={enviando}>
                            {enviando ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}